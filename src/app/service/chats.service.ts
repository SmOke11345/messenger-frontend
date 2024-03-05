import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlEnums } from "../models/Enums/UrlEnums";
import { MessagesType } from "../models/messagesTypes";
import { ChatType } from "../models/chatsTypes";
import { retry } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ChatsService {
    constructor(private http: HttpClient) {}

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
}
