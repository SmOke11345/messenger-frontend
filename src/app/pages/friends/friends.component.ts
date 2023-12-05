import { Component, OnInit } from "@angular/core";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

import { UserService } from "../../service/user.service";
import { User } from "../../models/UserTypes";
import { CardUserComponent } from "../../components/card-user/card-user.component";

import { Observable } from "rxjs";

@Component({
    selector: "messenger-friends",
    standalone: true,
    templateUrl: "./friends.component.html",
    providers: [UserService],
    styleUrls: ["./friends.component.scss"],
    imports: [NgForOf, AsyncPipe, NgIf, CardUserComponent],
})
export class FriendsComponent implements OnInit {
    usersData$: Observable<User[]> | undefined;

    constructor(private userService: UserService) {}

    /**
     * Получение всех пользователей после перехода на страницу
     */
    ngOnInit() {
        // TODO: Сделать динамическое обновление списка друзей, после добавление друга.
        this.usersData$ = this.userService.getFriends();

        this.usersData$.subscribe((response) => {});

        if (!this.usersData$) {
            console.log("У вас еще нет друзей, добавьте их!");
        }
    }

    addFriend() {
        this.userService.addFriends().subscribe((response) => {
            console.log(response);
        });
    }
}
