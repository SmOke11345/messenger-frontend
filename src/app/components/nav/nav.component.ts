import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: "messenger-nav",
    standalone: true,
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"],
    imports: [
        RouterLink,
    ],
})
export class NavComponent {
}
