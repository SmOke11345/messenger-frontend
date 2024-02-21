export type MessagesType = {
    content: string;
    senderId: number;
    createdAt: string;
    updatedAt: string;
};

export type SendMessageType = {
    content: string;
    chatId: string | undefined;
};
