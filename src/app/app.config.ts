import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app-routing.module";
import { provideClientHydration } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth-interceptor.service";
import { AppModule } from "./app.module";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
    providers: [
        AppModule,
        // Это позволит Interceptor`y применяться к каждому http запросу
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        provideRouter(routes),
        provideClientHydration(),
    ],
};
