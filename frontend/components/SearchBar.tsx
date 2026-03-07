"use client";

import { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex w-full max-w-2xl gap-3">
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full p-4 pl-10 text-sm text-white bg-gray-800 border border-gray-700 rounded-full focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-400 focus:outline-none transition-all"
                    placeholder="Search snippets by title, content or tag..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <button
                onClick={handleSearch}
                className="px-6 py-2 text-sm font-medium text-white bg-cyan-700 rounded-4xl hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-800 transition-colors"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;