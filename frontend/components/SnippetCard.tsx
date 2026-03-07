"use client";

import React from "react";
import type { ISnippet } from "@/types";

interface SnippetCardProps extends ISnippet {
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onDetails: (id: string) => void;
}

const SnippetCard = ({ _id, title, content, type, tags, onDelete, onEdit, onDetails }: SnippetCardProps) => {
    const handleAction = (e: React.MouseEvent, action: (id: string) => void) => {
        e.stopPropagation();
        action(_id);
    };

    return (
        <div
            className="flex flex-col border border-slate-800 p-5 rounded-xl shadow-lg bg-slate-900 text-white h-full transition-all hover:border-slate-700 cursor-pointer group"
            onClick={() => onDetails(_id)}
        >
            <div className="flex justify-between items-start gap-4">
                <h3 className="font-bold text-lg text-gray-100 wrap-break-words line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {title}
                </h3>
                <span className="shrink-0 text-[10px] uppercase tracking-wider font-bold bg-gray-700 text-gray-300 px-2 py-1 rounded-md border border-gray-600">
                    {type}
                </span>
            </div>

            <div className="mt-3 mb-4 grow">
                <p className="text-gray-400 text-sm leading-relaxed wrap-break-words line-clamp-4">
                    {content}
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {tags?.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs font-medium bg-cyan-900/50 text-cyan-200 px-2.5 py-1 rounded-full border border-cyan-800/50"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto flex gap-4 pt-4 border-t border-gray-700/50">
                <button
                    onClick={(e) => handleAction(e, onEdit)}
                    className="z-10 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                    Edit
                </button>
                <button
                    onClick={(e) => handleAction(e, onDelete)}
                    className="z-10 text-sm font-medium text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default SnippetCard;