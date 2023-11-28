import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { LoginResponse, User } from "../models/UserTypes";
import { UrlEnums } from "../models/Enums/UrlEnums";

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
    login(user: User) {
        return this.http.post<LoginResponse>(UrlEnums.URL_LOGIN, user).pipe(
            // Обрабатываем полученные ошибки с сервера
            catchError((error) => {
                return throwError(error);
            }),
            tap((response) => {
                console.log(response);
                this.setCookie(response); // Устанавливает токен в cookie
                this.router.navigate(["/chats"]);
            }),
        );
    }

    /**
     * Используется для установки полученных данных в cookie
     * @param response
     */
    setCookie(response: LoginResponse) {
        // Установка токена
        this.cookieService.set("access_token", response.access_token, {
            expires: new Date(response.data.cookie.expires),
            sameSite: "Strict",
        });

        // Установка id пользователя
        this.cookieService.set("user_id", `${response.data.passport.user.id}`, {
            expires: new Date(response.data.cookie.expires),
            sameSite: "Strict",
        });
    }
}
