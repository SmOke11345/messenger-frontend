import { Component, Input } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

import { User } from "../../models/UserTypes";
import { UsersService } from "../../service/users.service";

@Component({
    selector: "card-user",
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    providers: [UsersService],
    templateUrl: "./card-user.component.html",
    styleUrl: "./card-user.component.scss",
})
export class CardUserComponent {
    @Input() userData: User;
    @Input() enableButton: boolean;

    friends: User[] = [];
    disable: boolean = false;

    constructor(private usersService: UsersService) {
        this.userData = {} as User;
        this.enableButton = true || false;
    }

    /**
     * Добавление в друзья
     * @param id
     */
    addFriend(id: number) {
        this.usersService.addFriend(id).subscribe((response) => {
            this.disable = true;
            console.log("Добавлен", response);
        });
    }

    /**
     * Удаление из друзей
     * @param id
     */
    deleteFriend(id: number) {
        this.usersService.deleteFriend(id).subscribe((response) => {
            this.disable = true;
            console.log("Удален", response);
        });
    }
}
