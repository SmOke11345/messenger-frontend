import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { User } from "../../../models/UserTypes";
import { UsersService } from "../../../service/users.service";

@Component({
    selector: "app-profile",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    providers: [CookieService, UsersService],
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
    errors: string = "";
    show: boolean = false;

    profileEdit: FormGroup;

    constructor(
        private usersService: UsersService,
        private cookieService: CookieService,
        private router: Router,
    ) {
        const user_data = this.cookieService.get("user_data");
        const user: User = JSON.parse(user_data);

        this.profileEdit = new FormGroup({
            name: new FormControl(user.name, [Validators.required]),
            lastname: new FormControl(user.lastname),
            login: new FormControl(user.login, [Validators.required]),
            password: new FormControl(user.password, [
                Validators.required,
                Validators.minLength(6),
            ]),
            profile_img: new FormControl(user.profile_img),
        });
    }

    /**
     * Установка новых данных в cookie
     * @param response
     */
    setNewCookie(response: any) {
        const update_data = {
            id: response.id,
            name: response.name,
            lastname: response.lastname,
            login: response.login,
            profile_img: response.profile_img,
        };

        this.cookieService.set("user_data", JSON.stringify(update_data), {
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            sameSite: "Strict",
        });
    }

    /**
     * Отправка измененных данных
     */
    onSubmit() {
        const formFieldTouched = {}; // Создаем новый объект для хранения измененных данных
        for (const control in this.profileEdit.controls) {
            // Если с полем было совершено событие touched, то отправляем значение controls в объект
            if (this.profileEdit.controls[control].touched) {
                // @ts-ignore TODO: В дальнейшем исправить тип
                formFieldTouched[control] = this.profileEdit.value[control];
            }
        }

        this.usersService.patchProfile(formFieldTouched as User).subscribe({
            next: (response) => {
                // Обновляем данные пользователя в cookie. P.S. думаю это можно сделать иначе.
                this.setNewCookie(response);
            },
            error: (error) => {
                this.errors = `${error.error.message}`;
            },
            complete: () => {
                this.router.navigate(["/settings"]);
            },
        });
    }
}
