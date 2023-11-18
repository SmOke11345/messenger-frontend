import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthenticationService } from "../service/authentication.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthGuardChats implements CanActivate {
    // TODO: Доделать чтобы пользователь мог получить доступ только после авторизации
    constructor(
        private authService: AuthenticationService,
        private router: Router,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isAuth) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}
