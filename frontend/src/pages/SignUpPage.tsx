import { useState } from "react";

import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";


export type SignUpFormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<SignUpFormData>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { signUp, isSigningUp } = useAuthStore() as {
        signUp: (formData: SignUpFormData) => Promise<void>;
        isSigningUp: boolean;
    };

    const validateForm = () => {
        //empty fields check
        if (!formData.fullName.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
            toast.error("All fields are required.");
            return false;
        }

        //invalid email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        //invalid password length check
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return false;
        }

        //passwords match check
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return false;
        }


        return true;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Submitting form with data:", formData);
        if (!validateForm()) return;
        console.log("Form data is valid, proceeding to sign up.");

        await signUp(formData);
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-base-content/80 mb-2">Create Account</h2>
                <p className="text-base-content/60">Please fill in the details below to create your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="form-control">
                    <label className="label mb-1">
                        <span>Full Name</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            className="input input-bordered w-full pl-10"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/70 size-5 pointer-events-none" />
                    </div>
                </div>

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
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                {/* Confirm Password */}
                <div className="form-control">
                    <label className="label mb-1">
                        <span>Confirm Password</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input input-bordered w-full pl-10"
                            placeholder="Re-enter password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/70 size-5 pointer-events-none" />
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp} onClick={handleSubmit}>
                    {isSigningUp ? <Loader2 className="animate-spin" /> : "Sign Up"}
                </button>

                <p className="text-sm text-base-content/60 mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default SignUpPage