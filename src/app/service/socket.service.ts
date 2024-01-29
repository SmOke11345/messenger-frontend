import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { io } from "socket.io-client";

@Injectable({ providedIn: "root" })
export class SocketService {
    socket: any;

    constructor() {
        this.socket = io("http://localhost:3000");
    }

    /**
     * Подключение сокета.
     */
    connect() {
        this.socket.on("connect", () => {
            console.log("connected");
        });
    }

    /**
     * Отключение от сокета при переходе на другую страницу.
     */
    disconnect() {
        this.socket.disconnect();
        console.log("disconnected");
    }

    /**
     * Получение сообщений.
     */
    getMessages() {
        return new Observable((observer: Observer<any>) => {
            this.socket.on("onMessage", (data: string) => {
                observer.next(data);
            });
        });
    }

    /**
     * Отправка сообщений.
     * @param message
     */
    sendMessage(message: string) {
        return this.socket.emit("newMessage", message);
    }
}
