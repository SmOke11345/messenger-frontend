import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlEnums } from "../models/Enums/UrlEnums";
import { MessagesType, SendMessageType } from "../models/messagesTypes";
import { ChatType } from "../models/chatsTypes";
import { retry } from "rxjs";

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
        return this.http
            .get<MessagesType[]>(`${UrlEnums.URL_CHATS}/get-messages/${chatId}`)
            .pipe(retry(2));
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
        return this.http
            .get<ChatType[]>(`${UrlEnums.URL_CHATS}/get-all-chats`)
            .pipe(retry(2));
    }

    /**
     * Удаление сообщений.
     * @param chatId
     * @param messages
     */
    deleteMessages(chatId: string, messages: number[]) {
        return this.http.delete(`${UrlEnums.URL_CHATS}/delete-messages`, {
            body: {
                chatId,
                messages,
            },
        });
    }

    /**
     * Изменение сообщения.
     * @param chatId
     * @param messageId
     * @param content
     */
    updateMessage(chatId: string, messageId: number, content: string) {
        return this.http.patch(`${UrlEnums.URL_CHATS}/update-message`, {
            chatId,
            messageId,
            content,
        });
    }

    // TODO: Сделать изменение сообщения.
}
