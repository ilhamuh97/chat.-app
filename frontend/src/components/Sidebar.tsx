import { useEffect, useCallback } from "react";

import { Users2 as ContactsIcon, User as UserIcon } from "lucide-react";

import useChatStore, { type ChatState } from "../store/useChatStore";
import type { IUser } from "../types/user";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
    const {
        getUsers,
        users,
        isUsersLoading,
        selectedUser,
        setSelectedUser,
    } = useChatStore() as ChatState;

    const initLoad = useCallback(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        initLoad();
    }, [initLoad]);

    if (isUsersLoading) return <SidebarSkeleton />;

    if (!users || users.length === 0) {
        return (
            <aside className="flex flex-col items-center justify-center h-full p-6 text-base-content/50 text-sm w-[72px] sm:w-[260px] bg-base-100 border-r border-base-300/50">
                <p className="hidden sm:block">No users</p>
                <ContactsIcon className="size-6 sm:hidden text-base-content/60" />
            </aside>
        );
    }

    return (
        <aside
            className="
				h-full flex flex-col
				bg-base-100 border-r border-base-300/50
				w-[72px] sm:w-[260px]
				shrink-0
				transition-all duration-300
			"
        >
            {/* Header */}
            <div className="p-4 border-b border-base-300/50 flex items-center justify-center sm:justify-start gap-2">
                <ContactsIcon className="size-5 text-base-content/70" />
                <span className="hidden sm:inline text-sm font-medium text-base-content/70">
                    Contacts
                </span>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-base-300/50 hover:scrollbar-thumb-base-300">
                <ul>
                    {users.map((user: IUser) => {
                        const isActive = selectedUser?._id === user._id;
                        const isOnline = user.status === "online";

                        return (
                            <li key={user._id}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedUser(user)}
                                    className={`group w-full flex items-center gap-3 px-2 sm:px-4 py-3 transition-all duration-150 text-left
										${isActive
                                            ? "bg-primary/10 text-primary"
                                            : "hover:bg-base-200 text-base-content/80"
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div className="relative mx-auto sm:mx-0 shrink-0">
                                        {user.profilePicture ? (
                                            <img
                                                src={user.profilePicture}
                                                alt={user.fullName}
                                                className="w-10 h-10 rounded-full object-cover border border-base-300"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                                                <UserIcon className="size-5 text-base-content/60" />
                                            </div>
                                        )}
                                        {isOnline && (
                                            <span
                                                className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-100"
                                                title="Online"
                                            />
                                        )}
                                    </div>

                                    {/* Info (hidden on small screens) */}
                                    <div className="hidden sm:flex min-w-0 flex-1 flex-col">
                                        <p
                                            className={`truncate text-sm font-medium ${isActive
                                                ? "text-primary"
                                                : "text-base-content"
                                                }`}
                                        >
                                            {user.fullName || "Unnamed User"}
                                        </p>
                                        <p className="text-xs text-base-content/50">
                                            {isOnline ? "Online" : "Offline"}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
