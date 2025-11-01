import { create } from 'zustand';

export interface ThemeState {
    theme: string;
    setTheme: (newTheme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: localStorage.getItem("theme") || "coffee",
    setTheme: (newTheme: string) => {
        localStorage.setItem("theme", newTheme);
        set({ theme: newTheme });
    },
}));