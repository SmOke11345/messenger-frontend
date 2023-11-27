import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { PathEnum } from "./models/Enums/PathEnum";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./pages/guards/auth.guard";
import { AuthService } from "./service/auth.service";
import { LayoutComponent } from "./pages/layout.component";
import { UserService } from "./service/user.service";

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
        ],
    },
    {
        path: "",
        component: LayoutComponent,
        // Для получения доступа к маршруту
        canActivate: [AuthGuard],
        // И его наследников (детей)
        canActivateChild: [AuthGuard],
        children: [
            {
                path: PathEnum.PATH_CHATS,
                // Изменение title страницы
                title: "Chats",
                // Чтобы страница не загружалась сразу
                loadComponent: () =>
                    import("./pages/chats/chats.component").then(
                        (m) => m.ChatsComponent,
                    ),
            },
            {
                path: PathEnum.PATH_FRIENDS,
                title: "Friends",
                loadComponent: () =>
                    import("./pages/friends/friends.component").then(
                        (m) => m.FriendsComponent,
                    ),
            },
            {
                path: PathEnum.PATH_SETTINGS,
                title: "Settings",
                loadComponent: () =>
                    import("./pages/settings/settings.component").then(
                        (m) => m.SettingsComponent,
                    ),
            },
        ],
    },
    {
        path: "**",
        redirectTo: PathEnum.PATH_HOME,
    },
];

@NgModule({
    providers: [AuthGuard, AuthService, UserService],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
