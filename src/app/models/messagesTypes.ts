export type MessagesType = {
    user: {
        id: number;
        name: string;
        lastname: string;
        profile_img: string;
    };
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
