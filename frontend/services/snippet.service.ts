import api from "@/lib/axios";
import { ISnippet, CreateSnippetDto } from "@/types";

export const SnippetService = {
    getAllSnippets: async (params?: { page?: number; limit?: number; q?: string; tag?: string }) => {
        const { data } = await api.get<{ data: ISnippet[]; total: number }>('/snippets', { params });

        return data;
    },

    getOneSnippet: async (id: string) => {
        const { data } = await api.get<ISnippet>(`/snippets/${id}`);

        return data;
    },

    createSnippet: async (payload: CreateSnippetDto) => {
        const { data } = await api.post<ISnippet>('/snippets', payload);
        return data;
    },

    updateSnippet: async (id: string, payload: Partial<CreateSnippetDto>) => {
        const { data } = await api.patch<ISnippet>(`/snippets/${id}`, payload);
        return data;
    },

    deleteSnippet: async (id: string) => {
        await api.delete(`/snippets/${id}`);
    },
};