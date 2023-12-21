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
                this.setCookie(response); // Устанавливает токен в cookie
                this.router.navigate(["/chats"]);
            }),
        );
    }

    /**
     * Используется для установки полученных данных в cookie
     * @param response
     */
    setCookie(response: any) {
        // Время действия
        const expires = response.data.cookie.expires;
        // Получаем данные
        const response_data = response.data.passport.user;
        // Добавляем только те которые нам нужны
        const user_data = {
            id: response_data.id,
            name: response_data.name,
            lastname: response_data.lastname,
            login: response_data.login,
            profile_img: response_data.profile_img,
        };

        // Установка данных пользователя
        this.cookieService.set("user_data", `${JSON.stringify(user_data)}`, {
            expires: new Date(expires),
            sameSite: "Strict",
        });

        // Установка токена
        this.cookieService.set("access_token", response.access_token, {
            expires: new Date(expires),
            sameSite: "Strict",
        });
    }
}
