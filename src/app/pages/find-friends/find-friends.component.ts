import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardUserComponent } from "../../components/card-user/card-user.component";
import { UsersService } from "../../service/users.service";
import { User } from "../../models/UserTypes";
import { Observable } from "rxjs";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-find-friends",
    standalone: true,
    imports: [CommonModule, CardUserComponent, RouterLink],
    providers: [UsersService],
    templateUrl: "./find-friends.component.html",
    styles: [
        `
            .find-friends .wrapper {
                justify-content: normal;
            }

            button.prev {
                width: 10px;
                margin-right: 10px;
            }
        `,
    ],
})
export class FindFriendsComponent implements OnInit {
    usersData$: Observable<User[]> | undefined;
    enableButton: boolean = true;

    constructor(private usersService: UsersService) {}

    /**
     * Получение всех пользователей после инициализации страницы
     */
    ngOnInit() {
        this.usersData$ = this.usersService.getAllUsers();
    }
}
