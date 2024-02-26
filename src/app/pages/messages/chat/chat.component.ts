import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { SocketService } from "../../../service/socket.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import { ChatsService } from "../../../service/chats.service";
import { MessagesType } from "../../../models/messagesTypes";
import { CookieService } from "ngx-cookie-service";
import { FormsModule } from "@angular/forms";

type membersType = {
    id: number;
    name: string;
    lastname: string;
    profile_img: string;
};

@Component({
    selector: "chat",
    standalone: true,
    imports: [NgForOf, DatePipe, NgIf, NgClass, FormsModule, RouterLink],
    providers: [SocketService, ChatsService, CookieService],
    templateUrl: "./chat.component.html",
    styleUrl: "./chat.component.scss",
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
    messages: MessagesType[] = [];
    selectedMessages: number[] = [];

    id: string = "";
    content: string = "";

    userId = JSON.parse(this.cookieService.get("user_data")).id;
    // isSelected: boolean = false;

    membersData: membersType;
    private SubRouter: Subscription;

    constructor(
        private socketService: SocketService,
        private chatsService: ChatsService,
        private router: ActivatedRoute,
        private cookieService: CookieService,
    ) {
        this.membersData = {} as membersType;
        // Получение id из роута.
        this.SubRouter = this.router.params.subscribe((params) => {
            this.id = params["id"];
        });
    }

    ngOnInit() {
        this.chatsService
            .createOrGetChat(this.id)
            .subscribe((data: { id: string }) => {
                this.socketService
                    .getMessages(data.id.toString())
                    .subscribe((data: MessagesType) => {
                        this.messages.push(data);
                    });
                this.chatsService
                    .getMessages(data.id.toString())
                    .subscribe((data: MessagesType[]) => {
                        this.membersData = data[0].user;
                        this.messages.push(...data.slice(1));
                    });
            });
    }

    // Действия происходят после получения доступа к DOM.
    ngAfterViewInit() {
        // Прокрутка страницы вниз.
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 300);
    }

    /**
     * Отключение от сокета и роута при переходе на другую страницу.
     */
    ngOnDestroy() {
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
                if (!this.content) return; // Если поле 'content' пустое.
                this.socketService.sendMessage(
                    this.content,
                    data.id.toString(),
                );
            });

        setTimeout(() => {
            this.content = "";
        }, 300);
    }

    /**
     * Выбор сообщений.
     * @param messageId
     */
    selectMessages(messageId: number) {
        if (this.selectedMessages.includes(messageId)) {
            this.selectedMessages = this.selectedMessages.filter(
                (id) => id !== messageId,
            );
        } else {
            this.selectedMessages.push(messageId);
        }
    }

    /**
     * Удаление выбранных сообщений.
     */
    deleteMessages() {
        this.chatsService.createOrGetChat(this.id).subscribe((data) => {
            this.chatsService
                .deleteMessages(data.id.toString(), this.selectedMessages)
                .subscribe();
        });
    }
}
