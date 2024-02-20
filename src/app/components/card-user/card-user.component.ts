import { Component, Input } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

import { User } from "../../models/UserTypes";
import { UsersService } from "../../service/users.service";
import { RouterLink } from "@angular/router";
import { SocketService } from "../../service/socket.service";
import { ChatsService } from "../../service/chats.service";

// TODO: Узнать почему сервер не хочет возвращать актуальные данные динамически без перезагрузки страницы, а лишь с перезагрузкой.

@Component({
    selector: "card-user",
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, RouterLink],
    providers: [UsersService, SocketService, ChatsService, SocketService],
    templateUrl: "./card-user.component.html",
    styleUrl: "./card-user.component.scss",
})
export class CardUserComponent {
    @Input() userData: any;
    @Input() enableButton: boolean = false;

    @Input() lastMessage: any;
    @Input() isChatCard: boolean = false;

    friends: User[] = [];
    disable: boolean = false;

    constructor(
        private usersService: UsersService,
        private chatsService: ChatsService,
        private socketService: SocketService,
    ) {}

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
            this.socketService.joinChat(data.id);
        });
    }
}
