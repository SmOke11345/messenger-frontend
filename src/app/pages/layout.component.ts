import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { NavComponent } from "../components/nav/nav.component";

@Component({
    standalone: true,
    selector: "app-layout",
    template: "<router-outlet></router-outlet><messenger-nav></messenger-nav>",
    imports: [RouterOutlet, NavComponent],
})
export class LayoutComponent {}
