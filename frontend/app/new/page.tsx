"use client";

import SnippetForm from "@/components/SnippetForm";
import Link from "next/link";

export default function NewSnippetPage() {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Link
                    href="/"
                    className="text-gray-400 hover:text-cyan-400 mb-6 inline-block transition-colors"
                >
                    ← Back to Vault
                </Link>

                <SnippetForm />
            </div>
        </div>
    );
}