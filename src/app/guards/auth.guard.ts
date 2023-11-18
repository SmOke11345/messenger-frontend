import { Inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../service/authentication.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    // TODO: Доделать чтобы пользователь мог получить доступ только после авторизации
    constructor(
        @Inject(AuthenticationService) private authService: AuthenticationService,
        private router: Router,
    ) {
    }

    async canActivate() {
        if (this.authService.isAuth) {
            return true;
        } else {
            return await this.router.navigate(["/login"]);
        }
    }
}