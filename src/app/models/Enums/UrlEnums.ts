export const Host = "http://localhost:3000/api";

export enum UrlEnums {
    URL_REGISTER = `${Host}/auth/register`,
    URL_LOGIN = `${Host}/auth/login`,
    URL_USERS = `${Host}/users`,
    URL_FRIENDS = `${Host}/users/friends`,
    URL_CHATS = `${Host}/chats`,
}
