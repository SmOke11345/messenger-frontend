import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { io } from "socket.io-client";
import { CookieService } from "ngx-cookie-service";
import { MessageType } from "../models/messagesTypes";

@Injectable({ providedIn: "root" })
export class SocketService {
    socket: any;

    constructor(private cookieService: CookieService) {}

    /**
     * Подключение к сокету.
     */
    connect() {
        this.socket = io("http://localhost:3000");
    }

    /**
     * Подключение к чату.
     * @param id
     */
    joinChat(id: string) {
        if (this.socket) {
            this.socket.emit("joinChat", id);
        }
    }

    /**
     * Получение сообщений.
     */
    getMessages(chatId: string) {
        this.connect();
        return new Observable((observer: Observer<any>) => {
            this.joinChat(chatId);

            this.socket.on("onMessage", (data: MessageType) => {
                observer.next(data);
            });
        });
    }

    /**
     * Получение измененных сообщений.
     * @param chatId
     */
    getUpdateMessage(chatId: string) {
        return new Observable((observer: Observer<any>) => {
            this.joinChat(chatId);

            this.socket.on("onUpdateMessage", (data: MessageType) => {
                observer.next(data);
            });
        });
    }

    /**
     * Отправка сообщений.
     * @param content
     * @param chatId
     */
    sendMessage(content: string, chatId: string) {
        this.connect();

        const senderId = JSON.parse(this.cookieService.get("user_data")).id; // Получение id пользователя из cookie

        this.socket.emit("newMessage", {
            senderId,
            content,
            chatId,
        });
    }

    /**
     * Изменение сообщения.
     * @param chatId
     * @param messageId
     * @param content
     */
    updateMessage(chatId: string, messageId: number, content: string) {
        this.connect();
        this.socket.emit("updateMessage", {
            chatId,
            messageId,
            content,
        });
    }
}
