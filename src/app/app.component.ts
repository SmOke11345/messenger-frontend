import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { CookieService } from "ngx-cookie-service";

@Component({
    selector: "app-root",
    standalone: true,
    template: "<router-outlet></router-outlet>",
    styleUrls: ["./app.component.scss"],
    imports: [RouterOutlet, CommonModule, HttpClientModule],
})
export class AppComponent implements OnInit {
    title = "messenger-frontend";

    constructor(private router: Router, private cookieService: CookieService) {}

    // TODO: работает, только как мне кажется не там где нужно
    ngOnInit() {
        const token = this.cookieService.check("access_token");
        if (token) {
            this.router.navigate(["/chats"]);
        }
    }
}
