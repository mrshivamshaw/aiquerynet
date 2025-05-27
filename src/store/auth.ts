import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand'

interface AuthState {
    token: string | null,
    user: { id: string; username: string } | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null,
    login: (userName: string, password: string) => Promise<void>,
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    login: async (username: string, password: string) => {
        set({ loading: true });
        try {
            const res = await axios.post('/api/auth/login', { username, password });
            if (!(res?.status == 200)) {
                toast.error(res?.data?.message);
            } else {
                set({ token: res?.data?.token, user: res?.data?.user, isAuthenticated: true, loading: false });
            }
        } catch (error) {
            set({ error: (error as any)?.response?.data?.message, loading: false });
        }
    },
    logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
    }
}))