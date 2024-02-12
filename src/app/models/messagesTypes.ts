export type MessagesType = {
    content: string;
    senderId: string;
    createdAt: string;
    updatedAt: string;
};

export type SendMessageType = {
    content: string;
    chatId: string | undefined;
};
