import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForOf } from "@angular/common";
import { SocketService } from "../../../service/socket.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ChatsService } from "../../../service/chats.service";

@Component({
    selector: "app-chat",
    standalone: true,
    imports: [NgForOf],
    providers: [SocketService, ChatsService],
    templateUrl: "./chat.component.html",
    styleUrl: "./chat.component.scss",
})
export class ChatComponent implements OnInit, OnDestroy {
    messages: string[] = [];
    private SubRouter: Subscription;
    private id: number | undefined;

    // Просто для примера работы сокета.
    // Должно происходить соединение при нажатии на пользователя, тем самым передавать его id и свое в комнату.

    constructor(
        private socketService: SocketService,
        // private chatService: ChatsService,
        private router: ActivatedRoute,
    ) {
        // Получение id из роута.
        this.SubRouter = this.router.params.subscribe((params) => {
            this.id = params["id"];
        });
    }

    ngOnInit() {
        this.socketService.connect();
        // TODO: при подключении, нужно будет получать сообщения из базы данных
        this.socketService.getMessages().subscribe((data) => {
            this.messages.push(data);
        });
    }

    /**
     * Отключение от сокета и роута при переходе на другую страницу.
     */
    ngOnDestroy() {
        this.socketService.disconnect();
        this.SubRouter.unsubscribe();
    }

    /**
     * Отправка сообщений.
     */
    sendMessage() {
        // Отправлять данные в базу данных.
        this.socketService.sendMessage("how are you?");
        // this.chatService.sendMessage("how are you?", this.id);
    }
}
