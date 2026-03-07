"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SnippetCard from "@/components/SnippetCard";
import SearchBar from "@/components/SearchBar";
import { SnippetService } from "@/services/snippet.service";
import type { ISnippet } from "@/types";

interface PaginationMeta {
	total: number;
	page: number;
	lastPage: number;
	limit: number;
}

export default function HomePage() {
	const router = useRouter();
	const [snippets, setSnippets] = useState<ISnippet[]>([]);
	const [meta, setMeta] = useState<PaginationMeta | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setPage] = useState(1);

	const fetchSnippets = async () => {
		try {
			setLoading(true);
			setError("");

			const response = await SnippetService.getAllSnippets({
				page,
				limit: 8,
				q: searchQuery,
			});

			setSnippets(response.data);
			setMeta(response.meta);
		} catch (err) {
			console.error(err);
			setError("Не вдалося завантажити сніпети.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSnippets();
	}, [page, searchQuery]);


	const handleSearch = (query: string) => {
		setSearchQuery(query);
		setPage(1);
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Ви впевнені, що хочете видалити цей сніпет?")) return;

		try {
			await SnippetService.deleteSnippet(id);

			setSnippets((prev) => prev.filter((s) => s._id !== id));

			if (snippets?.length === 1 && page > 1) {
				setPage((prev) => prev - 1);
			} else { }

		} catch (err) {
			alert("Помилка при видаленні");
		}
	};

	const handleEdit = (id: string) => {
		router.push(`/edit/${id}`);
	};

	const handleDetails = (id: string) => {
		router.push(`/snippets/${id}`)
	}

	return (
		<main className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-10">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
				<h1 className="text-3xl font-bold bg-linear-to-r text-cyan-400 bg-clip-text">
					Snippet Vault
				</h1>

				<div className="w-full md:w-auto flex-1 flex justify-center">
					<SearchBar onSearch={handleSearch} />
				</div>

				<Link
					href="/new"
					className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-full transition-colors shadow-lg flex items-center gap-2"
				>
					<span>+</span> Create New
				</Link>
			</div>
			<div className="max-w-7xl mx-auto">
				{loading && (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
					</div>
				)}
				{!loading && error && (
					<div className="bg-red-900/30 border border-red-800 text-red-200 p-6 rounded-xl text-center">
						<p className="text-lg font-semibold">Oops!</p>
						<p>{error}</p>
						<button
							onClick={() => fetchSnippets()}
							className="mt-4 text-sm underline hover:text-white"
						>
							Try again
						</button>
					</div>
				)}
				{!loading && !error && snippets?.length === 0 && (
					<div className="text-center py-20 bg-gray-800/50 rounded-2xl border border-gray-700 border-dashed">
						<p className="text-gray-400 text-xl mb-4">
							{searchQuery ? `Nothing found for "${searchQuery}"` : "No snippets yet. Start collecting!"}
						</p>
						<Link href="/new" className="text-cyan-400 hover:underline">
							Create your first snippet
						</Link>
					</div>
				)}
				{!loading && !error && snippets?.length > 0 && (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{snippets.map((snippet) => (
								<SnippetCard
									key={snippet._id}
									{...snippet}
									onDelete={handleDelete}
									onEdit={handleEdit}
									onDetails={handleDetails}
								/>
							))}
						</div>
						{meta && meta.lastPage > 1 && (
							<div className="flex justify-center items-center gap-4 mt-12">
								<button
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									disabled={page === 1}
									className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									Previous
								</button>

								<span className="text-gray-400 text-sm">
									Page <span className="text-white font-bold">{meta.page}</span> of {meta.lastPage}
								</span>

								<button
									onClick={() => setPage((p) => Math.min(meta.lastPage, p + 1))}
									disabled={page === meta.lastPage}
									className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									Next
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</main>
	);
}