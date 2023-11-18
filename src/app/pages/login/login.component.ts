import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationService } from "../../service/authentication.service";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@Component({
    selector: "messenger-login",
    standalone: true,
    templateUrl: "./login.component.html",
    providers: [AuthenticationService],
    imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        NgIf,
        NgForOf,
        RouterLink,
    ],
})
export class LoginComponent {
    errors: string[] = [];

    show: boolean = false;
    inputType: string = "password";

    form: FormGroup;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
    ) {
        this.form = new FormGroup({
            email: new FormControl(""),
            password: new FormControl(""),
        });
    }

    changeShow() {
        this.show = !this.show;
        if (this.inputType == "password") {
            this.inputType = "text";
        } else {
            this.inputType = "password";
        }
    }

    // TODO: установить token в заголовок Bearer , токен устанавливается только тогда когда нужно получить доступ к какой либо странице

    onSubmit() {
        // TODO: уже лучше, как мне кажется, ошибка появляется после подписки на сервис, нужно проследить весь путь
        this.authService.login({ ...this.form.value }).subscribe({
            next: () => {
                //     toast добро пожаловать ... и редирект на страницу chats
                return this.router.navigate(["chats"]);
            },
            // Обрабатываем полученные из service ошибки и выводим их
            error: (error) => {
                console.log(error);
                this.errors = [`${error.error.message}`];
            },
        });
    }
}
