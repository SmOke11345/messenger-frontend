import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";

import { NavComponent } from "../../components/nav/nav.component";

@Component({
    selector: "messenger-chats",
    standalone: true,
    templateUrl: "./chats.component.html",
    styleUrls: ["./chats.component.scss"],
    imports: [RouterOutlet, NgIf, NavComponent, NgForOf],
})
export class ChatsComponent {}
