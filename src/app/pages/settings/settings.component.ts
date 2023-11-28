import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { CookieService } from "ngx-cookie-service";

@Component({
    selector: "app-settings",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
    constructor(private router: Router, private cookieService: CookieService) {}

    /**
     * Выход из аккаунта
     * Удаление токена из cookie
     */
    exit() {
        this.cookieService.delete("access_token");
        this.router.navigate(["/login"]);
    }
}
