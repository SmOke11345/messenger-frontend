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
}
