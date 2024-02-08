import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { io } from "socket.io-client";

@Injectable({ providedIn: "root" })
export class SocketService {
    socket: any;

    // TODO: логика пока что сходиться к тому, что нужно подключать пользователя каждый раз к комнате , для получения сообщений и отправке и т.д. P.S Пока что нашел только такой выход, скорее всего можно сделать как-то проще.

    // TODO: Сделать отправление сообщений в базу данных. Их отображение при подключении к комнате.
    constructor() {
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
        this.socket.emit("joinChat", chatId);
        this.socket.emit("newMessage", {
            content,
            chatId,
        });
    }
}
