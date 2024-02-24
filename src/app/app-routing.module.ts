import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./pages/layout.component";
import { UsersService } from "./service/users.service";
import { AuthService } from "./service/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { PathEnum } from "./models/Enums/PathEnum";
import { MessagesComponent } from "./pages/messages/messages.component";

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
                component: MessagesComponent,
            },
            {
                path: `${PathEnum.PATH_CHATS}/:id`,
                title: "Chat",
                loadComponent: () =>
                    import("./pages/messages/chat/chat.component").then(
                        (m) => m.ChatComponent,
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
                path: `${PathEnum.PATH_FRIENDS}/find-friends`,
                title: "Find Friends",
                loadComponent: () =>
                    import(
                        "./pages/friends/find-friends/find-friends.component"
                    ).then((m) => m.FindFriendsComponent),
            },
            {
                path: PathEnum.PATH_SETTINGS,
                title: "Settings",
                loadComponent: () =>
                    import("./pages/settings/settings.component").then(
                        (m) => m.SettingsComponent,
                    ),
            },
            {
                path: `${PathEnum.PATH_SETTINGS}/profile/:id`,
                title: "Profile settings",
                loadComponent: () =>
                    import("./pages/settings/profile/profile.component").then(
                        (m) => m.ProfileComponent,
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
    providers: [AuthGuard, AuthService, UsersService],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
