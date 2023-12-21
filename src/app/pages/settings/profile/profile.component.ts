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

    // TODO: Сделать проверку , чтобы не отправлять новый пароль если он не был изменен, аналогично с другими полями
    // т.е нужно не добавлять не измененные поля формы при отправке запроса.

    /**
     * Отправка измененных данных
     */
    onSubmit() {
        this.usersService
            .patchProfile({ ...this.profileEdit.value })
            .subscribe({
                next: (response) => {
                    // Обновляем данные пользователя в cookie. P.S. думаю это можно сделать иначе.
                    const update_data = {
                        id: response.id,
                        name: response.name,
                        lastname: response.lastname,
                        login: response.login,
                        profile_img: response.profile_img,
                    };
                    this.cookieService.set(
                        "user_data",
                        JSON.stringify(update_data),
                    );
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
