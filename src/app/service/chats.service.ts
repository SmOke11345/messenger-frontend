import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlEnums } from "../models/Enums/UrlEnums";

@Injectable({
    providedIn: "root",
})
export class ChatsService {
    constructor(private http: HttpClient) {}

    // TODO: нужно узнать как создавать комнаты (rooms) для обмена сообщений между пользователями,
    // также нужно узнать как создать уникальных id комнаты.
    // Если один пользователь хочет создать комнату, он нажимает на кнопку и подключает себя и другого пользователя к комнате.

    /**
     * Добавление сообщений в базу данных.
     * @param content
     * @param id
     * @param chatId
     */
    // TODO: Добавить chatId
    sendMessage(content: string, id: number | undefined, chatId: string) {
        return this.http.post(`${UrlEnums.URL_CHATS}/${id}`, {
            content,
            chatId,
        });
    }

    createOrGetChat(friendId: number | undefined) {
        return this.http.post(
            `${UrlEnums.URL_CHATS}/create-or-get-chat/${friendId}`,
            {},
        );
    }
}
