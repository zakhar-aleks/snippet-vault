import api from "@/lib/axios";
import { ISnippet, CreateSnippetDto } from "@/types";

export interface SnippetResponse {
    data: ISnippet[];
    meta: {
        total: number;
        page: number;
        limit: number;
        lastPage: number;
    };
}

export const SnippetService = {
    getAllSnippets: async (params?: { page?: number; limit?: number; q?: string; tag?: string }) => {
        const response = await api.get<SnippetResponse>('/snippet', { params }) as unknown as SnippetResponse;
        return response;
    },

    getOneSnippet: async (id: string) => {
        return await api.get<ISnippet>(`/snippet/${id}`) as unknown as ISnippet;
    },

    createSnippet: async (payload: CreateSnippetDto) => {
        return await api.post<ISnippet>('/snippet', payload) as unknown as ISnippet;
    },

    updateSnippet: async (id: string, payload: Partial<CreateSnippetDto>) => {
        return await api.patch<ISnippet>(`/snippet/${id}`, payload) as unknown as ISnippet;
    },

    deleteSnippet: async (id: string) => {
        await api.delete(`/snippet/${id}`);
    },
};