import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";

import { NavComponent } from "../../components/nav/nav.component";
import { CardChatComponent } from "../../components/card-chat/card-chat.component";
import { ChatsService } from "../../service/chats.service";
import { chatType } from "../../models/chatsTypes";

@Component({
    selector: "messenger-chats",
    standalone: true,
    templateUrl: "./messages.component.html",
    styleUrls: ["./messages.component.scss"],
    imports: [RouterOutlet, NgIf, NavComponent, NgForOf, CardChatComponent],
    providers: [ChatsService],
})
export class MessagesComponent implements OnInit {
    chatsData: chatType[] = [];

    constructor(
        private chatsService: ChatsService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.chatsService.getAllChats().subscribe((data) => {
            this.chatsData = data;
            console.log(this.chatsData);
        });
    }
}
