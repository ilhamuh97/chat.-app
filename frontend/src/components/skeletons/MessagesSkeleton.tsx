const MessagesSkeleton = () => {
    return (
        <div className="flex flex-col h-full justify-center items-center gap-3 text-base-content/50">
            <div className="animate-pulse space-y-4 w-2/3">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-5 rounded-2xl ${i % 2 === 0
                            ? "bg-base-300/60 w-1/2"
                            : "bg-primary/30 w-2/3 self-end ml-auto"
                            }`}
                    ></div>
                ))}
            </div>
            <p className="text-xs mt-6 animate-pulse">Loading messages...</p>
        </div>
    );
};

export default MessagesSkeleton;
