import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlEnums } from "../models/Enums/UrlEnums";
import { MessagesType, SendMessageType } from "../models/messagesTypes";
import { ChatType } from "../models/chatsTypes";

@Injectable({
    providedIn: "root",
})
export class ChatsService {
    constructor(private http: HttpClient) {}

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

    /**
     * Получение сообщений.
     * @param chatId
     */
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

    /**
     * Получение всех чатов.
     */
    getAllChats() {
        return this.http.get<ChatType[]>(`${UrlEnums.URL_CHATS}/get-all-chats`);
    }
}
