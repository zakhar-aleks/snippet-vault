"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SnippetForm from "@/components/SnippetForm";
import { SnippetService } from "@/services/snippet.service";
import { ISnippet } from "@/types";
import Link from "next/link";

export default function EditSnippetPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [snippet, setSnippet] = useState<ISnippet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                setLoading(true);
                // Отримуємо дані одного сніпета
                const data = await SnippetService.getOneSnippet(id);
                setSnippet(data);
            } catch (err: any) {
                console.error(err);
                setError(err.response?.status === 404
                    ? "Snippet not found"
                    : "Failed to load snippet data");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchSnippet();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
            </div>
        );
    }

    if (error || !snippet) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
                <p className="text-xl text-red-400 mb-4">{error}</p>
                <Link href="/" className="bg-gray-800 px-6 py-2 rounded-lg hover:bg-gray-700">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Link
                    href="/"
                    className="text-gray-400 hover:text-cyan-400 mb-6 inline-block transition-colors"
                >
                    ← Cancel Editing
                </Link>
                <SnippetForm initialData={snippet} isEditMode={true} />
            </div>
        </div>
    );
}