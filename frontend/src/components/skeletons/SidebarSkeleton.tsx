const SidebarSkeleton = () => {
    return (
        <div className="p-4 space-y-4 animate-pulse">
            {/* Header Placeholder */}
            <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-24 bg-base-300 rounded"></div>
                <div className="h-5 w-5 bg-base-300 rounded-full"></div>
            </div>

            {/* User Items */}
            {Array.from({ length: 8 }).map((_, idx) => (
                <div
                    key={idx}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors"
                >
                    <div className="w-10 h-10 bg-base-300 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 bg-base-300 rounded"></div>
                        <div className="h-3 w-1/2 bg-base-300 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SidebarSkeleton;
