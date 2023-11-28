import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgIf } from "@angular/common";

import { NavComponent } from "../../components/nav/nav.component";

@Component({
    selector: "messenger-chats",
    standalone: true,
    templateUrl: "./chats.component.html",
    styleUrls: ["./chats.component.scss"],
    imports: [RouterOutlet, NgIf, NavComponent],
})
export class ChatsComponent {
    constructor() {}
}
