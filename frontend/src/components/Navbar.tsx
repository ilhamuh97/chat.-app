import { Settings, User, LogOut, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore, type AuthState } from "../store/useAuthStore";

const Navbar = () => {
    const { authUser, logout } = useAuthStore() as AuthState

    return (
        <nav className="navbar bg-base-100 border-b border-base-200 shadow-sm px-6">
            {/* Left side*/}
            <div className="flex-1">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-xl font-bold text-primary"
                >
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-content flex items-center justify-center font-semibold">
                        C
                    </div>
                    <span>Chatify</span>
                </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                <Link
                    to="/settings"
                    className="btn btn-ghost flex items-center gap-2"
                >
                    <Settings className="size-4" />
                    Settings
                </Link>

                {authUser && (
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-base-200 flex items-center justify-center">
                                {authUser.profilePicture ? (
                                    <img
                                        src={authUser.profilePicture}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserIcon className="text-base-content/70 size-5" />
                                )}
                            </div>
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44"
                        >
                            <li className="menu-title px-2 text-xs text-base-content/50">
                                Signed in as
                            </li>
                            <li className="px-2 text-sm mb-1 text-base-content/70 truncate">
                                {authUser.fullName}
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 hover:bg-base-200 rounded-md"
                                >
                                    <User className="size-4" />
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 text-error hover:bg-error/10 rounded-md"
                                >
                                    <LogOut className="size-4" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
