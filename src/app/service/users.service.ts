import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UrlEnums } from "../models/Enums/UrlEnums";
import { User } from "../models/UserTypes";
import { CookieService } from "ngx-cookie-service";

import { catchError, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class UsersService {
    private user_data = this.cookieService.get("user_data");
    // При переходе на страницу register была ошибка, JSON.parse => ee решение
    private user_id = !this.user_data ? 0 : JSON.parse(this.user_data).id;

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
        console.log("hello");
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
     * Добавление в друзья
     * @param id
     */
    addFriend(id: number) {
        return this.http.post(`${UrlEnums.URL_FRIENDS}/add/${id}`, {});
    }

    /**
     * Удаление из друзей
     * @param id
     */
    deleteFriend(id: number) {
        return this.http.delete(`${UrlEnums.URL_FRIENDS}/delete/${id}`);
    }

    /**
     * На странице find-friends
     * Получение пользователей по имени или фамилии
     * @param value
     */
    getSearchUsers(value: string) {
        return this.http
            .get<User[]>(`${UrlEnums.URL_USERS}/find-friends?q=${value}`)
            .pipe(
                // Обрабатываем полученные ошибки с сервера
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }

    /**
     * На странице friends
     * Получение друзей пользователя по имени или фамилии
     * @param value
     */
    getSearchFriends(value: string) {
        return this.http
            .get<User[]>(`${UrlEnums.URL_USERS}/friends?q=${value}`)
            .pipe(
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }

    /**
     * Изменение данных пользователя
     * @param data
     */
    patchProfile(data: User) {
        return this.http
            .patch<User>(`${UrlEnums.URL_USERS}/profile/${this.user_id}`, data)
            .pipe(
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }

    /**
     * Загрузка аватара пользователя
     * @param file
     */
    uploadImg(file: File) {
        const formData: FormData = new FormData();
        formData.append("file", file);
        return this.http.post(`${UrlEnums.URL_USERS}/upload`, formData);
    }
}
