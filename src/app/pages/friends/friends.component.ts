import { Component, OnInit } from "@angular/core";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

import { UsersService } from "../../service/users.service";
import { CardUserComponent } from "../../components/card-user/card-user.component";
import { RouterLink } from "@angular/router";
import { User } from "../../models/UserTypes";

@Component({
    selector: "messenger-friends",
    standalone: true,
    imports: [NgForOf, AsyncPipe, NgIf, CardUserComponent, RouterLink],
    providers: [UsersService],
    templateUrl: "./friends.component.html",
    styles: ["button.add {width: 20px}"],
})
export class FriendsComponent implements OnInit {
    friendsData: User[] = [];
    enableButton: boolean = false;

    error: string = "";

    constructor(private usersService: UsersService) {}

    /**
     * Получение друзей после перехода на страницу.
     */
    ngOnInit() {
        this.usersService.getFriends().subscribe({
            next: (data) => {
                this.friendsData = data;
            },
            error: (error) => {
                this.error = error.error.message;
                console.log(error);
            },
        });
    }
}
