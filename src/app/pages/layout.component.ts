import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";

import { NavComponent } from "../components/nav/nav.component";
import { NgIf } from "@angular/common";

@Component({
    standalone: true,
    selector: "layout",
    template:
        "<router-outlet></router-outlet><messenger-nav *ngIf='!isChat'></messenger-nav>",
    imports: [RouterOutlet, NavComponent, NgIf],
})
export class LayoutComponent {
    isChat: boolean = false;

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.isChat = event.url.includes("chats/");
            }
        });
    }
}
