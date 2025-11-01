import { useEffect } from "react";

import useChatStore, { type ChatState } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import MessagesSkeleton from "./skeletons/MessagesSkeleton";

const ChatContainer = () => {
    const {
        getMessages,
        isMessagesLoading,
        selectedUser,
        setSelectedUser,
    } = useChatStore() as ChatState;

    useEffect(() => {
        if (selectedUser) getMessages(selectedUser._id);
    }, [getMessages, selectedUser]);

    if (!selectedUser) return null;

    if (isMessagesLoading) {
        return (
            <div className="flex flex-col h-full bg-base-200">
                <ChatHeader selectedUser={selectedUser} onClose={() => setSelectedUser(null)} />
                <MessagesSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-base-200">
            <ChatHeader selectedUser={selectedUser} onClose={() => setSelectedUser(null)} />
            <Messages />
            <MessageInput />
        </div>
    );
};

export default ChatContainer;
