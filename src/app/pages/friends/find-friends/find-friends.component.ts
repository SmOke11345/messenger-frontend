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
})
export class FindFriendsComponent implements OnInit {
    usersData: User[] = [];
    enableButton: boolean = true;
    loading: boolean;

    errors: string[] = [];
    value: string = "";

    constructor(private usersService: UsersService, private router: Router) {
        this.loading = true;
    }

    /**
     * Получение всех пользователей после инициализации страницы
     */
    ngOnInit() {
        this.usersService.getAllUsers().subscribe({
            next: (data) => {
                this.usersData = data;
            },
            complete: () => {
                setTimeout(() => (this.loading = false), 400);
            },
        });
    }

    Search(value: string) {
        this.router.navigate([], { queryParams: { q: value } });
    }

    getSearchUsers() {
        this.loading = true;
        this.usersService.getSearchUsers(this.value).subscribe({
            next: (data) => {
                this.usersData = data;
            },
            error: (error) => {
                this.loading = false;
                this.usersData = [];
                this.errors = [`${error.error.message}`];
            },
            complete: () => {
                this.errors = [];
                setTimeout(() => (this.loading = false), 400);
            },
        });
    }
}
