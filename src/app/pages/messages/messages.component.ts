import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";

import { NavComponent } from "../../components/nav/nav.component";

@Component({
    selector: "messenger-chats",
    standalone: true,
    templateUrl: "./messages.component.html",
    styleUrls: ["./messages.component.scss"],
    imports: [RouterOutlet, NgIf, NavComponent, NgForOf],
})
export class MessagesComponent {}
