import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavComponent } from "../../components/nav/nav.component";
import { Router, RouterEvent, RouterOutlet } from "@angular/router";

@Component({
    selector: "messenger-chats",
    standalone: true,
    imports: [CommonModule, NavComponent, RouterOutlet],
    templateUrl: "./chats.component.html",
    styleUrls: ["./chats.component.scss"],
})
export class ChatsComponent {
    isChatsPath: boolean = false;

    constructor(private router: Router) {
        // Подписываемся на события роутов, когда путь вклучает нужное нам значение меняем значение isChatsPath
        this.router.events.subscribe((event) => {
            if (event instanceof RouterEvent) {
                if (event.url === "/chats") {
                    this.isChatsPath = true;
                } else {
                    this.isChatsPath = false;
                }
            }
        });
    }
}
