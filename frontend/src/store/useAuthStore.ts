import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';
import type { SignUpFormData } from '../pages/SignUpPage';
import type { ILoginData } from '../pages/LoginPage';


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check', { withCredentials: true });
            set({ authUser: res.data.data, isCheckingAuth: false });
        } catch (error) {
            set({ authUser: null });
            console.error("Error in checkAuth:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (formData: SignUpFormData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', formData, { withCredentials: true });
            set({ authUser: res.data.data });
            toast.success("Account created successfully.");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.message || "Sign up failed. Please try again.";
                toast.error(message);
            } else if (error instanceof Error) {
                toast.error(error.message || "Sign up failed. Please try again.");
            } else {
                toast.error("Sign up failed. Please try again.");
            }
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (credentials: ILoginData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', credentials, { withCredentials: true });
            set({ authUser: res.data.data });
            toast.success("Logged in successfully.");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.message || "Login failed. Please try again.";
                toast.error(message);
            } else if (error instanceof Error) {
                toast.error(error.message || "Login failed. Please try again.");
            } else {
                toast.error("Login failed. Please try again.");
            }
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
            set({ authUser: null });
            toast.success("Logged out successfully.");
        } catch (error) {
            toast.error("Logout failed. Please try again.");
            console.error("Logout failed:", error);
        }
    }
}));