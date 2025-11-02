import { User as UserIcon } from "lucide-react";

const MessagesSkeleton = () => {
    const fakeMessages = Array.from({ length: 6 }); // simulate few bubbles

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-base-200 animate-pulse">
            {fakeMessages.map((_, i) => {
                const isSender = i % 2 === 0;
                return (
                    <div
                        key={i}
                        className={`chat ${isSender ? "chat-end" : "chat-start"}`}
                    >
                        {/* Avatar */}
                        <div className="chat-image avatar">
                            <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                                <UserIcon className="w-5 h-5 text-base-content/40" />
                            </div>
                        </div>

                        {/* Bubble */}
                        <div
                            className={`chat-bubble ${isSender ? "bg-primary/10" : "bg-base-300/60"
                                } flex flex-col gap-2`}
                        >
                            {/* Random length message lines */}
                            <div className="h-3 w-40 bg-base-300 rounded"></div>
                            {i % 3 === 0 && (
                                <div className="h-3 w-28 bg-base-300 rounded"></div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessagesSkeleton;
