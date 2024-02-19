import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { CookieService } from "ngx-cookie-service";

@Component({
    selector: "app-root",
    standalone: true,
    template: "<router-outlet></router-outlet>",
    styleUrls: ["./app.component.scss"],
    imports: [RouterOutlet, CommonModule, HttpClientModule],
    providers: [CookieService, Router],
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        private cookieService: CookieService,
    ) {}

    ngOnInit() {
        const token = this.cookieService.check("access_token");

        if (token) {
            // Если в cookie есть path, то перенаправляем на него.
            if (this.cookieService.check("path")) {
                this.router.navigate([this.cookieService.get("path")]);
            }
            // Получаем значение url.
            this.router.events.subscribe((nav) => {
                if (nav instanceof NavigationEnd) {
                    this.cookieService.set("path", nav.url, {
                        expires: new Date(
                            new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
                        ),
                        sameSite: "Strict",
                    });
                }
            });
        }
    }
}
