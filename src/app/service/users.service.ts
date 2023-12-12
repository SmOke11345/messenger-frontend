import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UrlEnums } from "../models/Enums/UrlEnums";
import { FriendResponse, User } from "../models/UserTypes";
import { CookieService } from "ngx-cookie-service";
import { catchError, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class UsersService {
    private user_id = Number(this.cookieService.get("user_id"));

    constructor(
        private http: HttpClient,
        public cookieService: CookieService,
    ) {}

    /**
     * Получение всех пользователей
     */
    getAllUsers() {
        return this.http.get<User[]>(
            `${UrlEnums.URL_USERS}?id=${this.user_id}`,
        );
    }

    /**
     * Получение списка контактов пользователя
     */
    getFriends() {
        return this.http
            .get<User[]>(`${UrlEnums.URL_FRIENDS}/${this.user_id}`)
            .pipe(
                // Обрабатываем полученные ошибки с сервера
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }

    /**
     * Добавление контакта
     * @param id
     */
    addFriend(id: number) {
        return this.http.post<FriendResponse>(
            `${UrlEnums.URL_FRIENDS}/add/${id}`,
            {
                auth_user_id: this.user_id,
            },
        );
    }

    deleteFriend(id: number) {
        return this.http.post<FriendResponse>(
            `${UrlEnums.URL_FRIENDS}/delete/${id}`,
            {
                auth_user_id: this.user_id,
            },
        );
    }

    getSearchUsers(value: string) {
        return this.http
            .get<User[]>(`${UrlEnums.URL_USERS}/search?q=${value}`)
            .pipe(
                // Обрабатываем полученные ошибки с сервера
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }
}
