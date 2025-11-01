import { MessageSquareText } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-base-content/60 p-6 select-none">
            <div className="flex flex-col items-center space-y-3">
                <div className="bg-base-300/70 p-4 rounded-full">
                    <MessageSquareText className="w-10 h-10 text-base-content/70" />
                </div>
                <div>
                    <h2 className="text-base font-medium text-base-content/80">
                        Welcome to Chatify!
                    </h2>
                    <p className="text-sm text-base-content/60 mt-1">
                        Choose a contact from the sidebar to start a conversation.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NoChatSelected;
