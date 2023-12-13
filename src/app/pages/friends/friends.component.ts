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

    error: string = "";
    value: string = "";

    constructor(private usersService: UsersService, private router: Router) {}

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

    Search(value: string) {
        this.router.navigate([], { queryParams: { q: value } });
    }
}
