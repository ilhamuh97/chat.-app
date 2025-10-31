import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check', { withCredentials: true });
            set({ authUser: res.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ authUser: null });
            console.error("Error in checkAuth:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    }
}));