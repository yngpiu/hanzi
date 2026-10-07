import React, { useState } from "react";
import { AlertCircle, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WordEntry } from "@/components/word-entry/WordEntry";
import { useWordSearch } from "@/hooks/queries/useWordSearch";

const EXAMPLES = ["你好", "谢谢", "爱情", "朋友", "学习", "中国"];

export function SearchResults({
	query,
	onSearch,
}: {
	query: string;
	onSearch: (q: string) => void;
}) {
	const { data, isLoading, error } = useWordSearch(query);
	const results =
		data?.result?.filter((r) => r.word && r.search_all_means?.length) || [];
	const hasQuery = query.trim().length > 0;
	const notFound =
		hasQuery &&
		!isLoading &&
		!error &&
		data &&
		(!data.found || results.length === 0);

	const [active, setActive] = useState(0);

	// Reset active tab when query changes
	React.useEffect(() => {
		setActive(0);
	}, [query]);

	if (!hasQuery) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
				<div
					aria-hidden
					className="text-5xl sm:text-7xl md:text-9xl font-serif text-primary/20 select-none"
				>
					汉字
				</div>
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Từ điển Trung-Việt
					</h1>
				</div>
				<div className="flex flex-wrap gap-2 justify-center">
					{EXAMPLES.map((w) => (
						<Badge
							key={w}
							variant="outline"
							className="cursor-pointer text-sm py-1.5 px-3"
							onClick={() => onSearch(w)}
						>
							{w}
						</Badge>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{error && !isLoading && (
				<Alert variant="destructive">
					<AlertCircle size={15} />
					<AlertTitle>Lỗi</AlertTitle>
					<AlertDescription>{(error as Error).message}</AlertDescription>
				</Alert>
			)}

			{isLoading && (
				<div className="space-y-3">
					<Skeleton className="h-48 w-full rounded-xl" />
					<Skeleton className="h-24 w-full rounded-xl" />
					<Skeleton className="h-24 w-full rounded-xl" />
				</div>
			)}

			{notFound && (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<Search
						size={36}
						className="text-muted-foreground/50 mb-4"
						strokeWidth={1.5}
					/>
					<p className="text-lg font-medium mb-1">Không tìm thấy</p>
					<p className="text-sm text-muted-foreground">
						Không có kết quả cho <strong>{query}</strong>
					</p>
				</div>
			)}

			{!isLoading && results.length > 0 && (
				<>
					{results.length > 1 && (
						<div className="flex flex-wrap gap-1.5">
							{results.map((r: any, i: number) => (
								<Button
									key={r.id || r._id || i}
									variant={i === active ? "default" : "secondary"}
									size="sm"
									onClick={() => setActive(i)}
								>
									{r.pinyin || r.word || `#${i + 1}`}
								</Button>
							))}
						</div>
					)}

					{results.map((r: any, i: number) => (
						<div key={r.id || r._id || i} hidden={i !== active}>
							<WordEntry word={r} onSearch={onSearch} />
						</div>
					))}
				</>
			)}
		</div>
	);
}
