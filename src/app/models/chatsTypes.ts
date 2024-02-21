export type ChatType = {
    user: ChatUserType;
    lastMessage: ChatLastMessageType;
};

export type ChatUserType = {
    id: number;
    name: string;
    lastname: string;
    profile_img: string;
};

export type ChatLastMessageType = {
    senderId: number;
    createdAt: Date;
    content: string;
};
