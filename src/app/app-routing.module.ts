import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { PathEnum } from "./models/Enums/PathEnum";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./pages/guards/auth.guard";
import { AuthService } from "./service/auth.service";

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
                // TODO: Доделать получение доступа, только после авторизации пользователя
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: PathEnum.PATH_FRIENDS,
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
    providers: [AuthGuard, AuthService],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
