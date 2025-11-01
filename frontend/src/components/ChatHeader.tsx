import React from "react";

import { User as UserIcon, X } from "lucide-react";

import type { IUser } from "../types/user";

interface ChatHeaderProps {
    selectedUser: IUser;
    onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedUser, onClose }) => {
    return (
        <div className="px-4 py-3 border-b border-base-300 flex items-center gap-3 bg-base-100/5">
            <div className="w-9 h-9 rounded-full bg-base-300 flex items-center justify-center overflow-hidden">
                {selectedUser?.profilePicture ? (
                    <img
                        src={selectedUser.profilePicture}
                        alt={selectedUser.fullName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <UserIcon className="w-5 h-5 text-base-content/70" />
                )}
            </div>
            <div>
                <h2 className="text-sm font-medium text-base-content">
                    {selectedUser?.fullName}
                </h2>
                <p className="text-xs text-base-content/50">Online</p>
            </div>
            <div className="flex-1" />
            <button
                className="btn btn-ghost btn-sm"
                onClick={onClose}
                aria-label="Close chat"
            >
                <X />
            </button>
        </div>
    );
};

export default ChatHeader;
