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
        this.chatsService.createOrGetChat(this.id).subscribe((data: any) => {
            this.socketService
                .getMessages(data.id)
                .subscribe((data: string) => {
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
        this.chatsService.createOrGetChat(this.id).subscribe((data: any) => {
            this.socketService.sendMessage("content", data.id.toString());
        });
        // TODO: Отправлять данные в базу данных.
    }
}
