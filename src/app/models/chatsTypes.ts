export type ChatType = {
    user: {
        id: number;
        name: string;
        lastname: string;
        profile_img: string;
    };
    lastMessage: {
        senderId: number;
        createdAt: Date;
        content: string;
    };
};
