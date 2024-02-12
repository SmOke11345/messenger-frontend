import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlEnums } from "../models/Enums/UrlEnums";
import { MessagesType, SendMessageType } from "../models/messagesTypes";

@Injectable({
    providedIn: "root",
})
export class ChatsService {
    constructor(private http: HttpClient) {}

    // TODO: Если один пользователь хочет создать комнату, он нажимает на кнопку и подключает себя и другого пользователя к комнате.

    /**
     * Добавление сообщений в базу данных.
     * @param content
     * @param chatId
     */
    sendMessage(content: string, chatId: string | undefined) {
        return this.http.post<SendMessageType>(
            `${UrlEnums.URL_CHATS}/send-message`,
            {
                content,
                chatId,
            },
        );
    }

    getMessages(chatId: string) {
        return this.http.get<MessagesType[]>(
            `${UrlEnums.URL_CHATS}/get-messages/${chatId}`,
        );
    }

    /**
     * Создание-получение чата.
     * @param friendId
     */
    createOrGetChat(friendId?: string) {
        return this.http.get<{ id: string }>(
            `${UrlEnums.URL_CHATS}/create-or-get-chat/${friendId}`,
        );
    }
}
