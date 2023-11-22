import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector: "app-settings",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
    constructor(private router: Router) {}

    /**
     * Выход из аккаунта
     */
    exit() {
        localStorage.removeItem("access_token");
        this.router.navigate(["/login"]);
    }
}
