import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";

import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private cookieService: CookieService) {}

    canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
        const token = this.cookieService.check("access_token");
        if (token) {
            return true;
        }
        this.router.navigate(["/login"]);
        return false;
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }
}
