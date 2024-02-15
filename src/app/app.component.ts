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
    constructor(
        private router: Router,
        private cookieService: CookieService,
    ) {}

    ngOnInit() {
        const token = this.cookieService.check("access_token");

        if (token) {
            // TODO: Получить путь, добавить его в куки, при подключении переходить по значению их куки.
            // this.router.events.subscribe((nav) => {
            //     if (nav instanceof NavigationEnd) {
            //         this.cookieService.set("path", nav.url, {
            //             expires: new Date(
            //                 new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
            //             ),
            //             sameSite: "Strict",
            //         });
            //     }
            // });
            // this.router.navigate(JSON.parse(this.cookieService.get("path")));
        }
    }
}
