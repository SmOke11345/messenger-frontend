import { Component, OnInit } from "@angular/core";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

import { UsersService } from "../../service/users.service";
import { User } from "../../models/UserTypes";
import { CardUserComponent } from "../../components/card-user/card-user.component";

import { Observable } from "rxjs";
import { RouterLink } from "@angular/router";

@Component({
    selector: "messenger-friends",
    standalone: true,
    imports: [NgForOf, AsyncPipe, NgIf, CardUserComponent, RouterLink],
    providers: [UsersService],
    templateUrl: "./friends.component.html",
    styles: ["button.add {width: 20px}"],
})
export class FriendsComponent implements OnInit {
    friendsData$: Observable<User[]> | undefined;

    constructor(private userService: UsersService) {}

    /**
     * Получение друзей после перехода на страницу
     */
    ngOnInit() {
        this.friendsData$ = this.userService.getFriends();
    }
}
