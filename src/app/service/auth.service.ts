import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginResponse, User } from "../models/UserTypes";
import { UrlEnums } from "../models/Enums/UrlEnums";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private cookieService: CookieService,
    ) {}

    /**
     * Регистрация пользователя
     * @param user
     */
    register(user: any): Observable<User> {
        return this.http
            .post<User>(UrlEnums.URL_REGISTER, {
                ...user,
            })
            .pipe(
                // Обрабатываем полученные ошибки с сервера
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }

    /**
     * Аутентификация пользователя
     * @param user
     */
    login(user: any) {
        return this.http.post<LoginResponse>(UrlEnums.URL_LOGIN, user).pipe(
            // Обрабатываем полученные ошибки с сервера
            catchError((error) => {
                return throwError(error);
            }),
            tap((response) => {
                // Устанавливает токен в cookie
                // (использую, чтобы было какое-то время по истечение которого токен удалялся)
                this.cookieService.set("access_token", response.access_token, {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 дней
                    sameSite: "Strict",
                });

                this.router.navigate(["/chats"]);
            }),
        );
    }
}
