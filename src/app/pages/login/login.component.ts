import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationService } from "../../service/authentication.service";
import { HttpClientModule } from "@angular/common/http";

@Component({
    selector: "messenger-login",
    standalone: true,
    providers: [AuthenticationService],
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    templateUrl: "./login.component.html",
})
export class LoginComponent {
    errors: string[] = [];

    show: boolean = false;
    inputType: string = "password";

    form: FormGroup;

    constructor(
        public authService: AuthenticationService,
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
        this.authService.login({ ...this.form.value }).subscribe({
            next: (response) => {
            },
            // Обрабатываем полученные из service ошибки и выводим их
            error: (error) => {
                console.log(error);
                this.errors = [`${error.error.message}`];
            },
            complete: () => {
                //     toast добро пожаловать ... и редирект на страницу chats
                this.router.navigate(["chats"]);
            },
        });
    }
}
