export type User = {
    id: number;
    name: string;
    login: string;
    lastname?: string;
    password: string;
    profile_img?: string;
};

type Cookie = {
    originalMaxAge: number;
    expires: Date;
    httpOnly: boolean;
    path: string;
};

export interface LoginResponse {
    access_token: string;
    data: {
        cookie: Cookie;
        passport: {
            user: User;
        };
    };
}

export type FriendResponse = {
    auth_user_id: number;
    id: number;
};
