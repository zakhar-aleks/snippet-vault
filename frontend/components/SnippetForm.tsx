"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SnippetService } from "@/services/snippet.service";
import type { CreateSnippetDto, ISnippet, SnippetType } from "@/types";

interface SnippetFormProps {
    initialData?: ISnippet;
    isEditMode?: boolean;
}

interface FormInput {
    title: string;
    content: string;
    type: SnippetType;
    tagsString: string;
}

const SnippetForm = ({ initialData, isEditMode = false }: SnippetFormProps) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>({
        defaultValues: {
            title: initialData?.title || "",
            content: initialData?.content || "",
            type: initialData?.type! || "note",
            tagsString: initialData?.tags?.join(", ") || "",
        },
    });

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setError("");

        try {
            const tagsArray = data.tagsString
                .split(",")
                .map((tag: any) => tag.trim())
                .filter((tag: any) => tag.length > 0);

            const payload: CreateSnippetDto = {
                title: data.title,
                content: data.content,
                type: data.type,
                tags: tagsArray,
            };

            if (isEditMode && initialData) {
                await SnippetService.updateSnippet(initialData._id, payload);
            } else {
                await SnippetService.createSnippet(payload);
            }

            router.push("/");
            router.refresh();
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">
                {isEditMode ? "Edit Snippet" : "Create New Snippet"}
            </h2>
            {error && <div className="mb-4 p-3 bg-red-900/50 text-red-200 text-sm rounded">{error}</div>}
            <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2">Title</label>
                <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="e.g., React useEffect Hook"
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2">Content / Code</label>
                <textarea
                    {...register("content", { required: "Content is required" })}
                    rows={5}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm"
                    placeholder="Paste your snippet here..."
                />
                {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2">Type</label>
                <select
                    {...register("type")}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                    <option value="note">Note</option>
                    <option value="link">Link</option>
                    <option value="command">Command</option>
                </select>
            </div>
            <div className="mb-6">
                <label className="block text-gray-400 text-sm font-bold mb-2">Tags (comma separated)</label>
                <input
                    {...register("tagsString")}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="react, hooks, frontend"
                />
            </div>
            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? "Saving..." : isEditMode ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
};

export default SnippetForm;