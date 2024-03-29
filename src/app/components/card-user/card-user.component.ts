import { Component, Input } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

import { User } from "../../models/UserTypes";
import { UsersService } from "../../service/users.service";
import { RouterLink } from "@angular/router";
import { SocketService } from "../../service/socket.service";
import { ChatsService } from "../../service/chats.service";
import { ChatLastMessageType, ChatUserType } from "../../models/chatsTypes";

@Component({
    selector: "card-user",
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, RouterLink],
    providers: [UsersService, SocketService, ChatsService, SocketService],
    templateUrl: "./card-user.component.html",
    styleUrl: "./card-user.component.scss",
})
export class CardUserComponent {
    @Input() userData: ChatUserType;
    @Input() lastMessage: ChatLastMessageType;
    friends: User[] = [];

    @Input() enableButton: boolean = false;
    @Input() isChatCard: boolean = false;
    disable: boolean = false;

    constructor(
        private usersService: UsersService,
        private chatsService: ChatsService,
        private socketService: SocketService,
    ) {
        this.userData = {} as ChatUserType;
        this.lastMessage = {} as ChatLastMessageType;
    }

    /**
     * Добавление в друзья
     * @param id
     */
    addFriend(id: number) {
        this.usersService.addFriend(id).subscribe(() => {
            this.disable = true;
        });
    }

    /**
     * Удаление из друзей
     * @param id
     */
    deleteFriend(id: number) {
        this.usersService.deleteFriend(id).subscribe(() => {
            this.disable = true;
        });
    }

    /**
     * Создание-получение чата.
     * @param friendId
     */
    createOrGetChat(friendId?: string) {
        this.chatsService.createOrGetChat(friendId).subscribe((data: any) => {
            this.socketService.connect();
            this.socketService.joinChat(data.id);
        });
    }

    /**
     * Не полное отображение сообщения в карточке.
     */
    prepareLastMessage() {
        if (this.lastMessage.content.length < 11) {
            return this.lastMessage.content;
        }
        return (this.lastMessage.content =
            this.lastMessage.content.slice(0, 11) + "...");
    }
}
