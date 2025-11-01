import useChatStore, { type ChatState } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
    const { selectedUser } = useChatStore() as ChatState;

    return (
        <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-base-200">
            {/* Outer container */}
            <div className="flex w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden bg-base-100 border border-base-300 m-5">
                {/* Sidebar (User List) */}
                <Sidebar />

                {/* Chat Container */}
                <main className="flex-1 bg-linear-to-br from-base-100 to-base-200">
                    {selectedUser ? (
                        <ChatContainer />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <NoChatSelected />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default HomePage;
