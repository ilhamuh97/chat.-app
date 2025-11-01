import { useState, useRef } from "react";

import { ImagePlus, X, Send } from "lucide-react";
import toast from "react-hot-toast";

import type { ChatState } from "../store/useChatStore";
import useChatStore from "../store/useChatStore";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { sendMessage } = useChatStore() as ChatState;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file?.type.startsWith("image/")) {
            toast.error("Please select a valid image file.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() === "" && !imagePreview) return;

        await sendMessage({
            text,
            image: imagePreview,
        });

        setText("");
        removeImage();
    };

    return (
        <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-base-300 flex flex-col gap-3 bg-base-100"
        >
            {/* Image preview (if selected) */}
            {imagePreview && (
                <div className="relative w-fit">
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg border border-base-300"
                    />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-base-100 rounded-full p-1 shadow-md hover:bg-base-200"
                        aria-label="Remove image"
                    >
                        <X className="w-4 h-4 text-base-content/70" />
                    </button>
                </div>
            )}

            {/* Input bar */}
            <div className="flex items-center gap-3">
                {/* Image upload button */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-ghost btn-sm"
                    aria-label="Upload image"
                >
                    <ImagePlus className="w-5 h-5 text-base-content/70" />
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                {/* Text input */}
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 input input-bordered input-sm bg-base-200"
                />

                {/* Send button */}
                <button
                    type="submit"
                    className="btn btn-primary btn-sm flex items-center gap-1"
                >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
