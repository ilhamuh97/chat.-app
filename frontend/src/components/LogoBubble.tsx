export default function LogoBubble() {
    return (
        <div className="w-8 h-8 rounded-lg bg-primary text-primary-content flex items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="20"
                height="20"
                fill="none"
                className="text-primary-content"
            >
                {/* Chat bubble */}
                <path
                    d="M6 8c0-1.657 1.79-3 4-3h12c2.21 0 4 1.343 4 3v8c0 1.657-1.79 3-4 3h-4.8c-.28 0-.55.1-.75.28L11 22.5c-.67.58-1.67.07-1.67-.8v-2.37C7.79 18.99 6 17.66 6 16V8Z"
                    fill="currentColor"
                />

                {/* Typing dots */}
                <circle cx="12" cy="12.5" r="1.4" fill="#fff" />
                <circle cx="16" cy="12.5" r="1.4" fill="#fff" />
                <circle cx="20" cy="12.5" r="1.4" fill="#fff" />
            </svg>
        </div>
    );
}