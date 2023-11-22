import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@Component({
    selector: "messenger-login",
    standalone: true,
    templateUrl: "./login.component.html",
    providers: [AuthService],
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

    constructor(private authService: AuthService, private router: Router) {
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

    // TODO: токен устанавливается только тогда когда нужно получить доступ к какой либо странице

    onSubmit() {
        this.authService.login({ ...this.form.value }).subscribe({
            next: (response) => {
                localStorage.setItem("access_token", response.access_token);

                // toast добро пожаловать ... и редирект на страницу chats
                this.router.navigate(["/chats"]);
            },
            // Обрабатываем полученные из service ошибки и выводим их
            error: (error) => {
                console.log(error);
                this.errors = [`${error.error.message}`];
            },
        });
    }
}
