import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgIf } from "@angular/common";
import { NavComponent } from "../../components/nav/nav.component";
import { AuthService } from "../../service/auth.service";

@Component({
    selector: "messenger-chats",
    standalone: true,
    templateUrl: "./chats.component.html",
    styleUrls: ["./chats.component.scss"],
    providers: [AuthService],
    imports: [RouterOutlet, NgIf, NavComponent],
})
export class ChatsComponent {
    constructor(private authService: AuthService) {}

    click() {
        this.authService.getData().subscribe();
    }
}
