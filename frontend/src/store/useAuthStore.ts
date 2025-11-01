import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from 'axios';

import { axiosInstance } from '../lib/axios';
import type { SignUpFormData } from '../pages/SignUpPage';
import type { ILoginData } from '../pages/LoginPage';
import type { IUser } from '../types/user';

export interface AuthState {
    authUser: IUser | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;

    checkAuth: () => Promise<void>;
    signUp: (formData: SignUpFormData) => Promise<void>;
    login: (credentials: ILoginData) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (updatedData: Partial<IUser>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check', { withCredentials: true });
            set({ authUser: res.data.data });
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
    },

    updateProfile: async (updatedData: Partial<IUser>) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', updatedData);
            set({ authUser: res.data.data });
            toast.success("Profile updated successfully.");
        } catch (error) {
            toast.error("Profile update failed. Please try again.");
            console.error("Profile update failed:", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));