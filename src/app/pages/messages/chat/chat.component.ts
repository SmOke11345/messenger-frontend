import {
    AfterViewInit,
    Component,
    DoCheck,
    OnDestroy,
    OnInit,
} from "@angular/core";
import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { SocketService } from "../../../service/socket.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import { ChatsService } from "../../../service/chats.service";
import { MessageByDateType } from "../../../models/messagesTypes";
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
export class ChatComponent
    implements OnInit, OnDestroy, AfterViewInit, DoCheck
{
    dataMessages: MessageByDateType[] = [];
    selectedMessages: number[] = [];
    statusDeleted: number[] = [];

    id: string = "";
    content: string = "";

    userId = JSON.parse(this.cookieService.get("user_data")).id;
    isUpdated: boolean = false;
    isFriendMessage: boolean = false;
    isNewMessages: boolean = true;

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
                // Получение сообщений из базы данных.
                this.chatsService
                    .getMessages(data.id.toString())
                    .subscribe((data) => {
                        console.log(data);
                        this.membersData = data[0].user;
                        const newData = data.slice(
                            1,
                        ) as unknown as MessageByDateType[];
                        this.dataMessages.push(...newData);
                    });

                // Работа с сокетом для получения сообщений.
                this.socketService
                    .getMessages(data.id.toString())
                    .subscribe((data: MessageByDateType) => {
                        // Только для новых сообщений
                        const findDate = this.dataMessages.find((item) =>
                            item.date.includes("Новое сообщения"),
                        );

                        if (findDate) {
                            const indexMessage =
                                this.dataMessages.indexOf(findDate);
                            this.dataMessages[indexMessage].messages.push(
                                data.messages[0],
                            );
                        } else {
                            this.dataMessages.push({
                                date: "Новое сообщения",
                                messages: [data.messages[0]],
                            });
                        }

                        this.isNewMessages = true;
                    });

                // Работа с сокетом для получения обновленных сообщений.
                this.socketService
                    .getUpdateMessage(data.id.toString())
                    .subscribe((data: MessageByDateType) => {
                        console.log(data.date);
                        // Только для новых сообщений
                        const findDate = this.dataMessages.find((item) => {
                            // TODO: на будущее, сделать чтобы все сообщения менялись у одного и другого пользователя сразу.
                            // return (
                            //     item.date === "Новое сообщения" ||
                            //     item.date === data.date
                            // );
                            return item.date === "Новое сообщения";
                        });

                        if (findDate) {
                            findDate.messages.map((message) => {
                                if (message.id === data.messages[0].id) {
                                    message.content = data.messages[0].content;

                                    this.isUpdated = false;
                                    this.content = "";
                                    this.selectedMessages = [];
                                }
                            });
                        }
                    });

                // Работа с сокетом для получения удаленных сообщений.
                this.socketService
                    .getDeleteMessage(data.id.toString())
                    .subscribe((data: number[]) => {
                        const deleteMessages = data.map((message) => {
                            return message;
                        });
                        this.statusDeleted.push(...deleteMessages);
                    });
            });
    }

    /**
     * Отслеживает изменения isNewMessages.
     */
    ngDoCheck() {
        if (this.isNewMessages) {
            // Прокрутка страницы вниз.
            setTimeout(() => {
                window.scrollTo(0, document.body.scrollHeight);
            }, 300);
        }
        this.isNewMessages = false;
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
     * @param event
     */
    selectMessages(messageId: number, event: any) {
        this.isFriendMessage =
            event.currentTarget.classList.contains("message-friend");

        // Если массив уже содержит такое значение.
        if (this.selectedMessages.includes(messageId)) {
            this.selectedMessages = this.selectedMessages.filter(
                (id) => id !== messageId,
            );
            this.content = "";
            this.isUpdated = false;
        } else {
            this.selectedMessages.push(messageId);
        }
    }

    /**
     * Удаление выбранных сообщений.
     */
    deleteMessages() {
        // Отправка текста об удалении сообщений в сокет.
        this.chatsService.createOrGetChat(this.id).subscribe((data) => {
            this.socketService.deleteMessage(
                data.id.toString(),
                this.selectedMessages,
            );
        });
        setTimeout(() => {
            this.selectedMessages = [];
        }, 50);
    }

    /**
     * Выбор сообщения для изменений.
     */
    selectUpdateMessage() {
        this.dataMessages.map((message) => {
            message.messages.map((message) => {
                if (message.id === this.selectedMessages[0]) {
                    this.content = message.content;
                }
            });
        });
        this.isUpdated = true;
    }

    /*
     * Изменение сообщения.
     */
    updateMessage() {
        if (this.isUpdated) {
            // Добавление в инпут значения выбранного сообщения.
            this.dataMessages.map((message) => {
                message.messages.map((message) => {
                    if (message.id === this.selectedMessages[0]) {
                        message.content = this.content;
                    }
                });
            });
            // Отправка обновленного сообщения в сокет.
            this.chatsService.createOrGetChat(this.id).subscribe((data) => {
                this.socketService.updateMessage(
                    data.id.toString(),
                    this.selectedMessages[0],
                    this.content,
                );
            });
        }
    }
}
