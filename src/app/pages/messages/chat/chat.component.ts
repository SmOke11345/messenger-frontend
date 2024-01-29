import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForOf } from "@angular/common";
import { SocketService } from "../../../service/socket.service";

@Component({
    selector: "app-chat",
    standalone: true,
    imports: [NgForOf],
    providers: [SocketService],
    templateUrl: "./chat.component.html",
    styleUrl: "./chat.component.scss",
})
export class ChatComponent implements OnInit, OnDestroy {
    messages: string[] = [];

    constructor(private socketService: SocketService) {}

    // Просто для примера работы сокета.
    // Должно происходить соединение при нажатии на пользователя, тем самым передавать его id и свое в комнату.

    ngOnInit() {
        this.socketService.connect();
        // при подключении, нужно будет получать сообщения из базы данных
        this.socketService.getMessages().subscribe((data) => {
            this.messages.push(data);
        });
    }

    /**
     * Отключение от сокета при переходе на другую страницу.
     */
    ngOnDestroy() {
        this.socketService.disconnect();
    }

    /**
     * Отправка сообщений.
     */
    sendMessage() {
        // Отправлять данные в базу данных.
        this.socketService.sendMessage("how are you?");
    }
}
