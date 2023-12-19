import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";

import { CookieService } from "ngx-cookie-service";
import { User } from "../../models/UserTypes";

@Component({
    selector: "app-settings",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
})
export class SettingsComponent implements OnInit {
    userData: User = {} as User;

    constructor(private router: Router, private cookieService: CookieService) {}

    ngOnInit() {
        const user_data = this.cookieService.get("user_data");
        this.userData = JSON.parse(user_data);
    }

    /**
     * Выход из аккаунта
     * Удаление токена из cookie
     */
    exit() {
        this.cookieService.delete("access_token");
        this.cookieService.delete("user_data");
        this.router.navigate(["/login"]);
    }
}
