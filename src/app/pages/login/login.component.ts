import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, NgForOf, NgIf } from "@angular/common";

import { AuthService } from "../../service/auth.service";

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

    constructor(private authService: AuthService) {
        this.form = new FormGroup({
            login: new FormControl(""),
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

    onSubmit() {
        this.authService.login({ ...this.form.value }).subscribe({
            // Обрабатываем полученные из service ошибки и выводим их
            error: (error) => {
                console.log(error);
                this.errors = [`${error.error.message}`];
            },
        });
    }
}
