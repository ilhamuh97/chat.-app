import { useState } from "react";

import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";


export type ILoginData = {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { login, isLoggingIn } = useAuthStore() as {
        login: (credentials: ILoginData) => Promise<void>;
        isLoggingIn: boolean;
    };

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        await login({ email, password });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-base-content/80 mb-2">Login</h2>
                <p className="text-base-content/60">Enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="form-control">
                    <label className="label mb-1">
                        <span>Email</span>
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            className="input input-bordered w-full pl-10"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/70 size-5 pointer-events-none" />
                    </div>
                </div>

                {/* Password */}
                <div className="form-control">
                    <label className="label mb-1">
                        <span>Password</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input input-bordered w-full pl-10 pr-10"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/70 size-5 pointer-events-none" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70"
                        >
                            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isLoggingIn}
                >
                    {isLoggingIn ? <Loader2 className="animate-spin" /> : "Login"}
                </button>

                <p className="text-sm text-base-content/60 mt-4 text-center">
                    Don&apos;t have an account? {" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
