import { useEffect, useState } from "react";

import { Sun, Moon, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import type { IUser } from "../types/user";

const Navbar = () => {
    const { authUser, logout } = useAuthStore() as {
        authUser: IUser | null;
        logout: () => Promise<void>;
    };

    // Theme management
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

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
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle"
                    aria-label="Toggle Theme"
                >
                    {theme === "light" ? (
                        <Moon className="size-5" />
                    ) : (
                        <Sun className="size-5" />
                    )}
                </button>

                {authUser && (
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar placeholder"
                        >
                            <div className="bg-primary text-primary-content rounded-full w-8 flex items-center justify-center font-semibold">
                                {authUser.fullName.charAt(0).toUpperCase()}
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
