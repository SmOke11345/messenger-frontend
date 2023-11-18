import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { PathEnum } from "./models/Enums/PathEnum";
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: PathEnum.PATH_HOME,
        pathMatch: "full",
    },
    {
        path: "",
        component: AppComponent,
        children: [
            {
                path: PathEnum.PATH_HOME,
                component: HomeComponent,
            },
            {
                path: PathEnum.PATH_REGISTER,
                component: RegisterComponent,
            },
            {
                path: PathEnum.PATH_LOGIN,
                component: LoginComponent,
            },
            {
                path: PathEnum.PATH_CHATS,
                // Чтобы страница не загружалась сразу
                loadComponent: () =>
                    import("./pages/chats/chats.component").then(
                        (m) => m.ChatsComponent,
                    ),
                // Доступ получает только авторизированный пользователь
                canActivate: [AuthGuard],
                children: [
                    {
                        path: PathEnum.PATH_CHATS,
                        // Чтобы страница не загружалась сразу
                        loadComponent: () =>
                            import("./pages/friends/friends.component").then(
                                (m) => m.FriendsComponent,
                            ),
                    },
                ],
            },
        ],
    },
    {
        path: "**",
        redirectTo: PathEnum.PATH_HOME,
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes,
        // Для загрузки в фоновом режиме всех асинхронных модулей
        { preloadingStrategy: PreloadAllModules })],
})
export class AppRoutingModule {
}