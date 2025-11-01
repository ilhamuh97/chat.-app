export interface IMessage {
    _id: string;
    sender: string;
    recipient: string;
    content: string;
    imageUrl?: string;
    updatedAt: Date;
    createdAt: Date;
}
