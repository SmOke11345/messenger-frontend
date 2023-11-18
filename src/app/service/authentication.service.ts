import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { User } from "../models/UserTypes";
import { UrlEnums } from "../models/Enums/UrlEnums";

@Injectable()
export class AuthenticationService {
    isAuth: boolean = false;

    constructor(private http: HttpClient) {
    }

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
        return this.http
            .post(UrlEnums.URL_LOGIN, user)
            .pipe(
                tap(() => {
                    this.isAuth = true;
                    console.log(this.isAuth);
                }),
                // Обрабатываем полученные ошибки с сервера
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }
}
