export type MessagesType = {
    user: UserMessageType;
    messages: MessageByDateType[];
};

export type UserMessageType = {
    id: number;
    name: string;
    lastname: string;
    profile_img: string;
};

export type MessageByDateType = {
    date: string;
    messages: MessageType[];
};

export type MessageType = {
    id: number;
    content: string;
    senderId: number;
    createdAt: string;
    updatedAt: string;
};

export type SendMessageType = {
    content: string;
    chatId: string | undefined;
};
