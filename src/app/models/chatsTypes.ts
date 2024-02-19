export type chatType = {
    members: {
        userId: number;
        user: {
            name: string;
            lastname: string;
            profile_img: string;
        };
    };
    lastMessage: {
        senderId: number;
        createdAt: Date;
        content: string;
    };
};
