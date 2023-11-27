import { Component, OnInit } from "@angular/core";
import { UserService } from "../../service/user.service";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { User } from "../../models/UserTypes";
import { Observable } from "rxjs";
import { CardUserComponent } from "../../components/card-user/card-user.component";

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
        this.usersData$ = this.userService.getAllUsers();
    }
}
