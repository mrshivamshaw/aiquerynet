import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";


interface Message {
    id: string;
    content: string;
    type: 'user' | 'bot';
}

interface ChatState {
    messages: Message[];
    isRecording: boolean;
    loading: boolean;
    error: string | null;
    addMessage: (content: string) => void;
    sendVoice: (audioBlob: Blob) => Promise<void>;
    sendQuery: (query: string) => Promise<void>;
    clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    isRecording: false,
    loading: false,
    error: null,
    addMessage: (content: string) => {
        set(state => ({
            messages: [...state.messages, { id: crypto.randomUUID(), content, type: 'user' }]
        }));
    },
    sendVoice: async (audioBlob: Blob) => {
        set({ loading: true });
        try {
            const formData = new FormData();
            formData.append('audio', audioBlob);
            const res = await axios.post('/api/voice', formData);
            if (!(res?.status == 200)) {
                toast.error(res?.data?.message);
            } else {
                set((state) => ({
                    messages: [...state.messages, { id: crypto.randomUUID(), content: res?.data?.message, type: 'bot' }]
                }));
            }
        } catch (error) {
            set({ error: (error as any)?.response?.data?.message, loading: false });
        }
    },
    sendQuery: async (query: string) => {
        set({ loading: true });
        try {
            const res = await axios.post('/api/query', { query });
            if (!(res?.status == 200)) {
                toast.error(res?.data?.message);
            } else {
                set((state) => ({
                    messages: [...state.messages, { id: crypto.randomUUID(), content: res?.data?.message, type: 'bot' }]
                }));
            }
        } catch (error) {
            set({ error: (error as any)?.response?.data?.message, loading: false });
        }
    },
    clearMessages: () => set({ messages: [] })
}));