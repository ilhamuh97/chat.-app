import { useAuthStore } from "../store/useAuthStore";
import type { IUser } from "../types/user";
import { useState, useEffect } from "react";
import { Camera, User, Mail, UserIcon } from "lucide-react";

const ProfilePage = () => {
    const { authUser, updateProfile } = useAuthStore() as {
        authUser: IUser | null;
        isUpdatingProfile: boolean;
        updateProfile: (formData: Partial<IUser>) => Promise<void>;
    };

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [formData, setFormData] = useState<{ fullName: string; email: string }>({
        fullName: "",
        email: "",
    });

    // Initialize form data when authUser changes
    useEffect(() => {
        if (authUser) {
            setFormData({
                fullName: authUser.fullName,
                email: authUser.email,
            });
        }
    }, [authUser]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64String = reader.result as string;
            setPreviewImage(base64String);
            await updateProfile({ profilePicture: base64String });
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProfile(formData);
    };

    if (!authUser) return null;

    return (
        <div className="max-w-md mx-auto mt-10 p-6">
            {/* Title */}
            <h2 className="text-2xl font-bold text-base-content/80 mb-6 text-center">
                Profile
            </h2>

            {/* Profile Image Section */}
            <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative w-32 h-32">
                    {previewImage || authUser?.profilePicture ? (
                        <img
                            src={previewImage || authUser.profilePicture}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border border-base-300"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full border border-base-300 bg-base-200 flex items-center justify-center">
                            <UserIcon className="text-base-content/40 size-12" />
                        </div>
                    )}

                    <label
                        htmlFor="profileImageInput"
                        className="absolute bottom-0 right-0 bg-primary text-primary-content rounded-full p-2 cursor-pointer shadow hover:bg-primary-focus transition"
                        title="Update Profile Image"
                    >
                        <Camera className="size-5" />
                    </label>
                    <input
                        type="file"
                        id="profileImageInput"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </div>

                <p className="text-base-content/60 text-sm">
                    Click the camera to update your profile picture
                </p>
            </div>

            {/* Profile Info Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                            readOnly
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/70 size-5 pointer-events-none" />
                    </div>
                </div>

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
                            readOnly
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/70 size-5 pointer-events-none" />
                    </div>
                </div>

            </form>
        </div>
    );
};

export default ProfilePage;
