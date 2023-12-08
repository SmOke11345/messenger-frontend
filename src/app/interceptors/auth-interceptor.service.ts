import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) {}

    /**
     * Используется для обработки запросов, и активируется только когда выполняется http запрос на backend
     * @param request
     * @param next
     */
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        console.log("Intercepted request:", request);

        // Получаем токен из cookie
        const token = this.cookieService.get("access_token");

        if (token) {
            // Устанавливаем токен в заголовок
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        // Возвращаем запрос
        return next.handle(request);

        // Проверяем, что запрос работает и выполняет свои функции
        //     .pipe(
        //     tap((event) => {
        //         if (event instanceof HttpResponse) {
        //             console.log("Intercepted response:", event);
        //         }
        //     }),
        // );
    }
}
