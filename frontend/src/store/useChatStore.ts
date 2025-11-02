import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios";
import type { IMessage } from "../types/message";
import type { IUser } from "../types/user";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export interface ChatState {
    messages: IMessage[];
    users: Array<IUser>;
    selectedUser: IUser | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;

    getUsers: () => Promise<void>;
    getMessages: (userId: string) => Promise<void>;
    sendMessage: (messageData: { text: string; image: string | null }) => Promise<void>;
    setSelectedUser: (user: IUser | null) => void;
    subscribeToMessages: () => void;
    unsubscribeFromMessages: () => void;
}

const useChatStore = create<ChatState>()((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("/messages/users");
            set({ users: response.data.users });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.message || "Failed to load users.";
                toast.error(message);
            } else {
                toast.error("Failed to load users.");
            }
            console.error("Error fetching users:", error);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId: string) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            console.log("Fetched messages:", response.data.messages);
            set({ messages: response.data.messages });
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to load messages.");
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async (messageData: { text: string; image: string | null }) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser!._id}`, messageData);
            set({ messages: [...messages, response.data.data] });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message.");
        }
    },
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket?.on("newMessage", (message: IMessage) => {
            const isMessageSentFromSelectedUser = message.sender === selectedUser._id || message.recipient === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({ messages: [...get().messages, message] });
        });
    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket?.off("newMessage");
    },
    setSelectedUser: (selectedUser: IUser | null) => {
        set({ selectedUser });
    },
}));

export default useChatStore;