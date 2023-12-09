import { Component } from "@angular/core";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

import { UsersService } from "../../service/users.service";
import { CardUserComponent } from "../../components/card-user/card-user.component";
import { RouterLink } from "@angular/router";
import { User } from "../../models/UserTypes";
import { Observable } from "rxjs";

@Component({
    selector: "messenger-friends",
    standalone: true,
    imports: [NgForOf, AsyncPipe, NgIf, CardUserComponent, RouterLink],
    providers: [UsersService],
    templateUrl: "./friends.component.html",
    styles: ["button.add {width: 20px}"],
})
export class FriendsComponent {
    friendsData$: Observable<User[]>;
    enableButton: boolean = false;

    /**
     * Получение друзей после перехода на страницу.
     * Использовал constructor, вместо ngOnInit, т.к. friendsData$ нужно изначальное значение при инициализации.
     */
    // TODO: нужно найти способ отлавливать изменения значений массива, полученных из getFriends(), вот только как это сделать... пока не доходит.
    constructor(private usersService: UsersService) {
        this.friendsData$ = this.usersService.getFriends();
    }
}
