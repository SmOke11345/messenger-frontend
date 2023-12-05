import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UrlEnums } from "../models/Enums/UrlEnums";
import { User } from "../models/UserTypes";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: "root" })
export class UserService {
    private user_id = this.cookieService.get("user_id");

    constructor(
        private http: HttpClient,
        public cookieService: CookieService,
    ) {}

    /**
     * Получение всех пользователей
     */
    getAllUsers() {
        return this.http.get<User[]>(UrlEnums.URL_USERS);
    }

    /**
     * Получение списка друзей пользователя
     */
    getFriends() {
        return this.http.get<User[]>(`${UrlEnums.URL_FRIENDS}/${this.user_id}`);
    }

    /**
     * Добавление друга
     */
    addFriends() {
        const id = 70;
        return this.http.post(`${UrlEnums.URL_FRIENDS}/add`, {
            auth_user: +this.user_id,
            friend_id: id,
        });
    }
}
