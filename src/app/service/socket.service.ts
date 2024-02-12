import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { io } from "socket.io-client";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: "root" })
export class SocketService {
    socket: any;

    constructor(private cookieService: CookieService) {
        this.socket = io("http://localhost:3000");
    }

    /**
     * Отключение от сокета при переходе на другую страницу.
     */
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    /**
     * Подключение к чату.
     * @param id
     */
    joinChat(id: string) {
        this.socket.emit("joinChat", id);
    }

    /**
     * Получение сообщений.
     */
    getMessages(chatId: string) {
        return new Observable((observer: Observer<any>) => {
            this.joinChat(chatId);
            this.socket.on("onMessage", (data: string) => {
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
        const senderId = this.cookieService.get("user_data"); // Получение id пользователя из cookie

        this.socket.emit("newMessage", {
            senderId: JSON.parse(senderId).id,
            content,
            chatId,
        });
    }
}
