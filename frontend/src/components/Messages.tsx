import { useEffect, useRef } from "react";

import { User as UserIcon, Image as ImageIcon } from "lucide-react";

import { useAuthStore, type AuthState } from "../store/useAuthStore";
import useChatStore, { type ChatState } from "../store/useChatStore";

const Messages = () => {
    const { messages, selectedUser } = useChatStore() as ChatState;
    const { authUser } = useAuthStore() as AuthState;
    const currentUserId = authUser?._id || "";

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (!messages?.length) {
        return (
            <div className="flex-1 flex items-center justify-center text-base-content/50 text-sm bg-base-200">
                <p>No messages yet. Start the conversation!</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-base-200 scrollbar-thin scrollbar-thumb-base-300/50 hover:scrollbar-thumb-base-300">
            {messages.map((msg) => {
                const isSender = msg.sender === currentUserId;
                const user = isSender ? authUser : selectedUser;
                const profilePicture = user?.profilePicture;
                const displayName = isSender ? "You" : user?.fullName || "User";

                return (
                    <div
                        key={msg._id}
                        className={`chat ${isSender ? "chat-end" : "chat-start"}`}
                    >
                        {/* Avatar */}
                        <div className="chat-image avatar">
                            <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center overflow-hidden">
                                {profilePicture ? (
                                    <img
                                        alt={displayName}
                                        src={profilePicture}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <UserIcon className="w-6 h-6 text-base-content/70" />
                                )}
                            </div>
                        </div>

                        {/* Header */}
                        <div className="chat-header">
                            {displayName}
                            {msg.createdAt && (
                                <time className="text-xs opacity-50 ml-2">
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </time>
                            )}
                        </div>

                        {/* Message bubble */}
                        <div className="chat-bubble flex flex-col gap-2">

                            {msg.imageUrl && (
                                <a
                                    href={msg.imageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block relative rounded-lg overflow-hidden border border-base-300 hover:opacity-90 transition"
                                >
                                    <img
                                        src={msg.imageUrl}
                                        alt="Attachment"
                                        className="max-w-xs rounded-lg object-cover w-60 h-60"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                    {!msg.imageUrl && (
                                        <div className="flex items-center justify-center p-4 bg-base-300 text-base-content/60">
                                            <ImageIcon className="w-4 h-4" />
                                        </div>
                                    )}
                                </a>
                            )}
                            {msg.content && <p>{msg.content}</p>}
                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
};

export default Messages;
