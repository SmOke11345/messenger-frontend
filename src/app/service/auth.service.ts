import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginResponse, User } from "../models/UserTypes";
import { UrlEnums } from "../models/Enums/UrlEnums";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private http: HttpClient) {}

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

    login(user: any) {
        return this.http.post<LoginResponse>(UrlEnums.URL_LOGIN, user).pipe(
            // Обрабатываем полученные ошибки с сервера
            catchError((error) => {
                return throwError(error);
            }),
        );
    }

    getData() {
        return this.http.get(UrlEnums.URL_USERS).subscribe({});
    }
}
