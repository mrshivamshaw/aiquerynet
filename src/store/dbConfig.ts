import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface DbConfig {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
}

interface DbConfigState {
    config: DbConfig | null;
    loading: boolean;
    error: string | null;
    saveConfig: (config: DbConfig) => Promise<void>;
    clearConfig: () => void;
}

export const useDBConfigStore = create<DbConfigState>((set) => ({
    config: null,
    error: null,
    loading: false,
    saveConfig: async (config: DbConfig) => {
        set({ loading: true });
        try {
            const res = await axios.post("/api/db/config", config);
            if (!(res?.status == 200)) {
                toast.error(res?.data?.message);
            } else {
                set({ config, error: null, loading: false });
            }
            set({ config, error: null, loading: false });
        } catch (error) {
            set({ error: (error as any)?.response?.data?.message, loading: false });
        }
    },
    clearConfig: () => set({ config: null })
}));