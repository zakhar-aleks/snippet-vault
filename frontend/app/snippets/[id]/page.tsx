"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SnippetService } from "@/services/snippet.service";
import { ISnippet } from "@/types";

export default function SnippetDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [snippet, setSnippet] = useState<ISnippet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                setLoading(true);
                const data = await SnippetService.getOneSnippet(id);
                setSnippet(data);
            } catch (err: any) {
                setError(err.response?.status === 404 ? "Snippet not found" : "Error loading snippet");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchSnippet();
    }, [id]);

    const handleCopy = () => {
        if (snippet?.content) {
            navigator.clipboard.writeText(snippet.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this snippet?")) return;
        try {
            await SnippetService.deleteSnippet(id);
            router.push("/");
            router.refresh();
        } catch (err) {
            alert("Failed to delete snippet");
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
        </div>
    );

    if (error || !snippet) return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
            <p className="text-xl text-red-400 mb-4">{error}</p>
            <Link href="/" className="bg-gray-800 px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Back to Home
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Navigation */}
                <div className="flex justify-between items-center mb-8">
                    <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                        ← Back to Vault
                    </Link>
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.push(`/edit/${id}`)}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors border border-gray-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg text-sm transition-colors border border-red-900/50"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-xl">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 text-xs font-bold rounded-full border border-cyan-800 uppercase tracking-widest">
                            {snippet.type}
                        </span>
                        {snippet.tags?.map(tag => (
                            <span key={tag} className="text-gray-400 text-sm">#{tag}</span>
                        ))}
                    </div>

                    <h1 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                        {snippet.title}
                    </h1>

                    <div className="relative group">
                        <button
                            onClick={handleCopy}
                            className="absolute top-4 right-4 bg-gray-700/50 hover:bg-gray-600 text-xs py-1.5 px-3 rounded-md transition-all opacity-0 group-hover:opacity-100 border border-gray-600 text-gray-200"
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>

                        <pre className="bg-gray-900 p-6 rounded-2xl overflow-x-auto border border-gray-700 font-mono text-sm leading-relaxed text-cyan-50">
                            <code>{snippet.content}</code>
                        </pre>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 flex justify-between text-xs text-gray-500">
                        <p>Created: {new Date(snippet?.createdAt).toLocaleString()}</p>
                        <p>Last updated: {new Date(snippet?.updatedAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}