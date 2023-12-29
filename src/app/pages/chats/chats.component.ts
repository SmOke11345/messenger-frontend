import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgIf } from "@angular/common";

import { NavComponent } from "../../components/nav/nav.component";
import { SocketService } from "../../service/socket.service";

@Component({
    selector: "messenger-chats",
    standalone: true,
    templateUrl: "./chats.component.html",
    styleUrls: ["./chats.component.scss"],
    providers: [SocketService],
    imports: [RouterOutlet, NgIf, NavComponent],
})
export class ChatsComponent implements OnInit {
    constructor(private socketService: SocketService) {}

    // Просто для примера работы сокета.
    ngOnInit() {
        this.socketService.connect();
    }
}
