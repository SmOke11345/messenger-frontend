import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { User } from "../models/UserTypes";

@Injectable({
    providedIn: "root",
})
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
            .post<User>("http://localhost:3000/api/auth/register", {
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
            .post("http://localhost:3000/api/auth/login", user)
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
