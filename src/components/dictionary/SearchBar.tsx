import { BookMarked, Clock, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSuggest } from "@/hooks/queries/useSuggest";

interface HistoryItem {
	word: string;
	pinyin?: string;
	meaning?: string;
}

const HISTORY_KEY = "search-history";
const MAX_HISTORY = 10;

function getHistory(): HistoryItem[] {
	try {
		const raw = localStorage.getItem(HISTORY_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function saveHistory(item: HistoryItem): HistoryItem[] {
	const history = getHistory();
	const filtered = history.filter((h) => h.word !== item.word);
	const updated = [item, ...filtered].slice(0, MAX_HISTORY);
	localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
	return updated;
}

export function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
	const [searchValue, setSearchValue] = useState("");
	const [debounced, setDebounced] = useState("");
	const [suggestOpen, setSuggestOpen] = useState(false);
	const [cursor, setCursor] = useState(-1);
	const [history, setHistory] = useState<HistoryItem[]>(() => getHistory());
	const [historyOpen, setHistoryOpen] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const wrapRef = useRef<HTMLDivElement>(null);
	const submittedRef = useRef(false);

	const trimmed = searchValue.trim();

	useEffect(() => {
		const t = setTimeout(() => setDebounced(trimmed), 200);
		return () => clearTimeout(t);
	}, [trimmed]);

	const { data: suggestData } = useSuggest(debounced);
	const suggestItems = suggestData || [];
	const suggestItemsRef = useRef(suggestItems);
	suggestItemsRef.current = suggestItems;

	useEffect(() => {
		if (submittedRef.current) return;
		if (trimmed && suggestItems.length > 0) {
			setSuggestOpen(true);
			setCursor(-1);
		} else {
			setSuggestOpen(false);
		}
	}, [trimmed, suggestItems]);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
				setSuggestOpen(false);
				setHistoryOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (trimmed.length > 0) setHistoryOpen(false);
	}, [trimmed]);

	const search = useCallback(
		(targetQ: string) => {
			submittedRef.current = true;
			setSearchValue(targetQ);
			setSuggestOpen(false);
			setHistoryOpen(false);
			if (targetQ) {
				const found = suggestItemsRef.current.find((s) => s.word === targetQ);
				const updated = saveHistory(found ?? { word: targetQ });
				setHistory(updated);
			}
			onSearch(targetQ);
		},
		[setSearchValue, onSearch],
	);

	function submit(q?: string) {
		const target = q || trimmed;
		if (target) search(target);
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			const items = historyOpen ? history : suggestItems;
			setCursor((prev) => Math.min(prev + 1, items.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setCursor((prev) => Math.max(prev - 1, 0));
		} else if (e.key === "Enter") {
			if (cursor >= 0) {
				const word = historyOpen
					? history[cursor]?.word
					: suggestItems[cursor]?.word;
				if (word) submit(word);
			} else {
				submit();
			}
		} else if (e.key === "Escape") {
			setSuggestOpen(false);
			setHistoryOpen(false);
		}
	}

	return (
		<div className="pt-4 pb-3 px-4 md:px-0">
			<div className="flex gap-2">
				<div ref={wrapRef} className="relative flex-1 scroll-mt-20">
					<Input
						ref={inputRef}
						placeholder="Nhập từ Hán (ví dụ: 你好, xiexie, bạn bè)…"
						value={searchValue}
						onChange={(e) => {
							submittedRef.current = false;
							setSearchValue(e.target.value);
							if (!e.target.value.trim() && history.length > 0) {
								setHistoryOpen(true);
								setCursor(-1);
							}
						}}
						onKeyDown={handleKeyDown}
						onFocus={(e) => {
							if (searchValue.trim() && suggestItems.length > 0) {
								setSuggestOpen(true);
								setCursor(-1);
							} else if (!searchValue.trim() && history.length > 0) {
								setHistoryOpen(true);
								setCursor(-1);
							}
							e.target.select();
						}}
						className="h-11 text-base pr-10"
					/>
					{searchValue && (
						<button
							type="button"
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
							onClick={() => {
								setSearchValue("");
								inputRef.current?.focus();
							}}
						>
							<X size={16} />
						</button>
					)}
					{((suggestOpen && suggestItems.length > 0) ||
						(historyOpen && history.length > 0)) && (
						<div
							className="scrollbar-thin absolute top-full left-0 right-0 z-20 mt-1 rounded-lg border bg-popover text-popover-foreground shadow-lg max-h-90 overflow-y-auto"
							role="listbox"
						>
							{historyOpen &&
								history.map((item: any, i: number) => (
									<button
										key={`h-${item.word}`}
										type="button"
										role="option"
										aria-selected={i === cursor}
										className={`flex w-full items-start gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground ${i === cursor ? "bg-accent" : ""}`}
										onMouseEnter={() => setCursor(i)}
										onClick={() => submit(item.word)}
									>
										<Clock
											size={13}
											className="mt-0.5 shrink-0 text-muted-foreground"
										/>
										<div className="min-w-0">
											<div>
												<span className="font-medium">{item.word}</span>
												{item.pinyin && (
													<span className="ml-1.5 text-xs text-muted-foreground">
														{item.pinyin}
													</span>
												)}
											</div>
											{item.meaning && (
												<div className="text-xs text-muted-foreground truncate">
													{item.meaning}
												</div>
											)}
										</div>
									</button>
								))}
							{suggestOpen &&
								suggestItems.map((item: any, i: number) => (
									<button
										key={`s-${item.word}`}
										type="button"
										role="option"
										aria-selected={i === cursor}
										className={`flex w-full items-start gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground ${i === cursor ? "bg-accent" : ""}`}
										onMouseEnter={() => setCursor(i)}
										onClick={() => submit(item.word)}
									>
										<BookMarked
											size={13}
											className="mt-0.5 shrink-0 text-muted-foreground"
										/>
										<div className="min-w-0">
											<div>
												<span className="font-medium">{item.word}</span>
												{item.pinyin && (
													<span className="ml-1.5 text-xs text-muted-foreground">
														{item.pinyin}
													</span>
												)}
											</div>
											{item.meaning && (
												<div className="text-xs text-muted-foreground truncate">
													{item.meaning}
												</div>
											)}
										</div>
									</button>
								))}
						</div>
					)}
				</div>
				<Button onClick={() => submit()} className="h-11 px-5 shrink-0">
					Tra
				</Button>
			</div>
		</div>
	);
}
