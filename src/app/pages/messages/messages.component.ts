import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";

import { NavComponent } from "../../components/nav/nav.component";
import { ChatsService } from "../../service/chats.service";
import { ChatType } from "../../models/chatsTypes";
import { CardUserComponent } from "../../components/card-user/card-user.component";

@Component({
    selector: "messenger-chats",
    standalone: true,
    templateUrl: "./messages.component.html",
    styleUrls: ["./messages.component.scss"],
    imports: [RouterOutlet, NgIf, NavComponent, NgForOf, CardUserComponent],
    providers: [ChatsService],
})
export class MessagesComponent implements OnInit {
    chatsData: ChatType[] = [];

    constructor(
        private chatsService: ChatsService,
        // private router: Router,
    ) {}

    ngOnInit() {
        this.chatsService.getAllChats().subscribe((data) => {
            this.chatsData = data;
            console.log(this.chatsData);
        });
    }
}
