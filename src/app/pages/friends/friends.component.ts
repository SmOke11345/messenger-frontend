import { Component, OnInit } from "@angular/core";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";

import { UsersService } from "../../service/users.service";
import { CardUserComponent } from "../../components/card-user/card-user.component";
import { User } from "../../models/UserTypes";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "messenger-friends",
    standalone: true,
    imports: [
        NgForOf,
        AsyncPipe,
        NgIf,
        CardUserComponent,
        RouterLink,
        FormsModule,
    ],
    providers: [UsersService],
    templateUrl: "./friends.component.html",
    styles: ["button.add {width: 20px}"],
})
export class FriendsComponent implements OnInit {
    friendsData: User[] = [];
    enableButton: boolean = false;
    showSearch: boolean = true;
    loading: boolean;

    error: string = "";
    value: string = "";

    constructor(private usersService: UsersService, private router: Router) {
        this.loading = true;
    }

    /**
     * Получение друзей после перехода на страницу.
     */
    ngOnInit() {
        this.usersService.getFriends().subscribe({
            next: (data) => {
                // TODO: Сделать чтобы, если массив пуст, то не показывалась строка поиска, а если нет то, показывалась.
                this.showSearch = data.length !== 0;
                this.friendsData = data;
            },
            error: (error) => {
                this.error = error.error.message;
                console.log(error);
            },
            complete: () => {
                setTimeout(() => (this.loading = false), 400);
            },
        });
    }

    Search(value: string) {
        this.router.navigate([], { queryParams: { q: value } });
    }

    getSearchFriends(value: string) {
        this.loading = true;
        return this.usersService.getSearchFriends(value).subscribe({
            next: (data) => {
                this.friendsData = data;
            },
            error: (error) => {
                this.friendsData = [];
                this.error = error.error.message;
            },
            complete: () => {
                this.error = "";
                setTimeout(() => (this.loading = false), 400);
            },
        });
    }
}
