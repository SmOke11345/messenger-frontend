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
        // TODO: Сделать отправку запроса,
        //  которая включает в себя user_id пользователя,
        //  и получить друзей пользователя. Затем сохранить их в отдельный массив.
        //  Можно сделать как при нажатии на кнопку, так и через ngOnInit (Мне кажется будет правильней).
        this.usersData$ = this.userService.getAllUsers();
    }
}
