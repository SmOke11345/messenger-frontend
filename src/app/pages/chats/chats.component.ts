import { Component } from "@angular/core";
import { Router, RouterEvent, RouterOutlet } from "@angular/router";
import { NgIf } from "@angular/common";
import { NavComponent } from "../../components/nav/nav.component";
import { AuthService } from "../../service/auth.service";

@Component({
    selector: "messenger-chats",
    standalone: true,
    templateUrl: "./chats.component.html",
    styleUrls: ["./chats.component.scss"],
    providers: [AuthService],
    imports: [
        RouterOutlet,
        NgIf,
        NavComponent,
    ],
})
export class ChatsComponent {
    isChatsPath: boolean = false;

    constructor(private router: Router, private authService: AuthService) {
        // Подписываемся на события роутов, когда путь включает нужное нам значение меняем значение isChatsPath
        this.router.events.subscribe((event) => {
            if (event instanceof RouterEvent) {
                this.isChatsPath = event.url === "/chats";
            }
        });
    }

    click() {
        this.authService.getData();
    }
}
