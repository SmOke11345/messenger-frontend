import { Component, OnDestroy, OnInit } from "@angular/core";
import { DatePipe, NgForOf } from "@angular/common";
import { SocketService } from "../../../service/socket.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ChatsService } from "../../../service/chats.service";
import { MessagesType } from "../../../models/messagesTypes";

@Component({
    selector: "app-chat",
    standalone: true,
    imports: [NgForOf, DatePipe],
    providers: [SocketService, ChatsService],
    templateUrl: "./chat.component.html",
    styleUrl: "./chat.component.scss",
})
export class ChatComponent implements OnInit, OnDestroy {
    messages: MessagesType[] = [];
    private SubRouter: Subscription;
    private id: string = "";

    constructor(
        private socketService: SocketService,
        private chatsService: ChatsService,
        private router: ActivatedRoute,
    ) {
        // Получение id из роута.
        this.SubRouter = this.router.params.subscribe((params) => {
            this.id = params["id"];
        });
    }

    ngOnInit() {
        // TODO: при подключении, нужно будет получать сообщения из базы данных
        this.chatsService
            .createOrGetChat(this.id)
            .subscribe((data: { id: string }) => {
                this.chatsService
                    .getMessages(data.id.toString())
                    .subscribe((data: MessagesType[]) => {
                        this.messages.push(...data);
                    });
                this.socketService
                    .getMessages(data.id.toString())
                    .subscribe((data) => {
                        console.log(this.messages);
                        this.messages.push(data);
                    });
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
        this.chatsService
            .createOrGetChat(this.id)
            .subscribe((data: { id: string }) => {
                this.chatsService
                    .sendMessage("content", data.id.toString())
                    // TODO: Обрабатывать ошибки.
                    .subscribe();
                this.socketService.sendMessage("content", data.id.toString());
            });
    }
}
