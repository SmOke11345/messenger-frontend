export interface User {
    name: string;
    email: string;
    lastname?: string;
    password: string;
    profile_img?: string;
}

// Используется для типизации полученных данных после аутентификации пользователя
export type LoginResponse = {
    access_token: string;
}
