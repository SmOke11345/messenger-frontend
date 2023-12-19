import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";

import { CardUserComponent } from "../../../components/card-user/card-user.component";
import { UsersService } from "../../../service/users.service";
import { User } from "../../../models/UserTypes";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-find-friends",
    standalone: true,
    imports: [CommonModule, CardUserComponent, RouterLink, FormsModule],
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
    usersData: User[] = [];
    enableButton: boolean = true;

    error: string = "";
    value: string = "";

    constructor(private usersService: UsersService, private router: Router) {}

    /**
     * Получение всех пользователей после инициализации страницы
     */
    ngOnInit() {
        this.usersService
            .getAllUsers()
            .subscribe((data) => (this.usersData = data));
    }

    Search(value: string) {
        this.router.navigate([], { queryParams: { q: value } });
    }

    getSearchUsers() {
        this.usersService.getSearchUsers(this.value).subscribe({
            next: (data) => {
                this.usersData = data;
                console.log(data);
            },
            error: (error) => {
                this.usersData = [];
                this.error = error.error.message;
                console.log(error);
            },
            complete: () => {
                this.error = "";
            },
        });
    }
}
