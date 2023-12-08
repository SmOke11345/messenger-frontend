import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UrlEnums } from "../models/Enums/UrlEnums";
import { FriendResponse, User } from "../models/UserTypes";
import { CookieService } from "ngx-cookie-service";

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
     * @param id
     */
    addFriend(id: number) {
        return this.http.post<FriendResponse>(`${UrlEnums.URL_FRIENDS}/add`, {
            auth_user_id: this.user_id,
            id,
        });
    }

    deleteFriend(id: number) {
        return this.http.post<FriendResponse>(
            `${UrlEnums.URL_FRIENDS}/delete`,
            {
                auth_user_id: this.user_id,
                id,
            },
        );
    }
}
