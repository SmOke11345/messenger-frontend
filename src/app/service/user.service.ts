import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UrlEnums } from "../models/Enums/UrlEnums";
import { User } from "../models/UserTypes";

@Injectable({ providedIn: "root" })
export class UserService {
    constructor(private http: HttpClient) {}

    /**
     * Получение всех пользователей
     */
    getAllUsers() {
        return this.http.get<User[]>(UrlEnums.URL_USERS);
    }
}
