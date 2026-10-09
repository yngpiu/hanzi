import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";

export function Dictionary() {
	useEffect(() => {
		document.title = "Từ điển Trung-Việt";
	}, []);

	const [queryToSearch, setQueryToSearch] = useState("");

	return (
		<div className="w-full">
			<SearchBar onSearch={setQueryToSearch} />
			<div className="px-4 md:px-0 pt-4">
				<SearchResults query={queryToSearch} onSearch={setQueryToSearch} />
			</div>
		</div>
	);
}
