import { Component } from "@angular/core";
import { Router, RouterEvent, RouterOutlet } from "@angular/router";
import { NgIf } from "@angular/common";
import { NavComponent } from "../../components/nav/nav.component";

@Component({
    selector: "messenger-chats",
    standalone: true,
    templateUrl: "./chats.component.html",
    styleUrls: ["./chats.component.scss"],
    imports: [
        RouterOutlet,
        NgIf,
        NavComponent,
    ],
})
export class ChatsComponent {
    isChatsPath: boolean = false;

    constructor(private router: Router) {
        // Подписываемся на события роутов, когда путь включает нужное нам значение меняем значение isChatsPath
        this.router.events.subscribe((event) => {
            if (event instanceof RouterEvent) {
                this.isChatsPath = event.url === "/chats";
            }
        });
    }
}
