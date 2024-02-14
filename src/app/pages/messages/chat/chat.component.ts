import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { SocketService } from "../../../service/socket.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ChatsService } from "../../../service/chats.service";
import { MessagesType } from "../../../models/messagesTypes";
import { CookieService } from "ngx-cookie-service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-chat",
    standalone: true,
    imports: [NgForOf, DatePipe, NgIf, NgClass, FormsModule],
    providers: [SocketService, ChatsService, CookieService],
    templateUrl: "./chat.component.html",
    styleUrl: "./chat.component.scss",
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
    messages: MessagesType[] = [];
    id: string = "";
    userId = JSON.parse(this.cookieService.get("user_data")).id;
    content: string = "";

    private SubRouter: Subscription;

    constructor(
        private socketService: SocketService,
        private chatsService: ChatsService,
        private router: ActivatedRoute,
        private cookieService: CookieService,
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
                    .subscribe((data: MessagesType) => {
                        this.messages.push(data);
                    });
            });
    }

    // Действия происходят после получения доступа к DOM
    ngAfterViewInit() {
        // TODO: Сделать прокрутку в конец страницы.
        window.scrollTo(0, document.body.offsetHeight);
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
                    .sendMessage(this.content, data.id.toString())
                    // TODO: Обрабатывать ошибки.
                    .subscribe();
                // TODO: Сделать чтобы нельзя было отправлять пустые сообщения, именно в сокет.
                this.socketService.sendMessage(
                    this.content,
                    data.id.toString(),
                );
            });

        this.content = "";
    }
}
