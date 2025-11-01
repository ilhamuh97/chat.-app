export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    profilePicture?: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'online' | 'offline' | 'away';
}