import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

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
    onlineUsers: string[];
    socket: Socket | null;

    checkAuth: () => Promise<void>;
    signUp: (formData: SignUpFormData) => Promise<void>;
    login: (credentials: ILoginData) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (updatedData: Partial<IUser>) => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void;
}

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create<AuthState>((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    socket: null,
    onlineUsers: [],

    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check', { withCredentials: true });
            set({ authUser: res.data.data });
            get().connectSocket();
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
            get().connectSocket();
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
            get().connectSocket();
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
            get().disconnectSocket();
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

    connectSocket: () => {
        const { authUser } = get();

        if (!authUser || get().socket?.connected) return;

        const socket = io(API_URL, {
            query: { userId: authUser._id },
        });

        socket.connect();
        set({ socket });

        socket.on("getOnlineUsers", (onlineUsers: string[]) => {
            set({ onlineUsers });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) {
            console.log("Disconnecting socket...");
            console.log("is socket connected?", get().socket?.connected);
            get().socket?.disconnect();
            console.log("is socket connected?", get().socket?.connected);
            set({ socket: null });
        }
    }
}));