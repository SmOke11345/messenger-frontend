import { Component, Input } from "@angular/core";
import { chatType } from "../../models/chatsTypes";
import { NgForOf } from "@angular/common";

@Component({
    selector: "app-card-chat",
    standalone: true,
    imports: [NgForOf],
    providers: [],
    templateUrl: "./card-chat.component.html",
    styleUrl: "./card-chat.component.scss",
})
export class CardChatComponent {
    @Input() chatData: chatType[] | undefined;

    // TODO: Доделать здесь, данные не приходят в компонент.

    constructor() {
        console.log(this.chatData);
    }
}
