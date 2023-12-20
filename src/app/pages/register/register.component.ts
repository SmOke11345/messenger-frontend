import { Component } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Router, RouterLink } from "@angular/router";
import { CommonModule, NgForOf, NgIf } from "@angular/common";

import { AuthService } from "../../service/auth.service";
import { UploadImgService } from "../../service/upload-img.service";
import { UrlEnums } from "../../models/Enums/UrlEnums";

@Component({
    selector: "messenger-register",
    standalone: true,
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    providers: [AuthService, UploadImgService],
    imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        NgIf,
        NgForOf,
        RouterLink,
    ],
})
export class RegisterComponent {
    imgAcc: string = ""; // Используется только для вывода изображений
    errors: string[] = [];
    inputType: string = "password";

    form: FormGroup;
    // @ts-ignore
    selectedFile: File;

    show: boolean = false;

    constructor(
        private authService: AuthService,
        private uploadService: UploadImgService,
        private router: Router,
    ) {
        this.form = new FormGroup({
            name: new FormControl("", [Validators.required]),
            login: new FormControl("", [Validators.required]),
            lastname: new FormControl(""),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(6),
            ]),
            profile_img: new FormControl(" "),
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

    /**
     * Вывод полученных данных из input type file,
     * в частности изображения пользователя при регистрации
     * @param event
     */
    onSelectFile(event: any) {
        // TODO: Сделать валидацию изображения по размеру
        this.selectedFile = event.target.files[0];

        // Вывод изображения после получения
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.imgAcc = event.target.result;
        };
        reader.readAsDataURL(this.selectedFile);

        // Добавление в поле profile_img путь к изображению
        let filename = this.selectedFile.name;
        filename = filename.replace(/\s+/g, ""); // Убираем пробелы

        this.form.controls["profile_img"].setValue(
            `${UrlEnums.URL_USERS}/upload/${filename}`,
        );
    }

    /**
     * Отправка аватара пользователя
     */
    pushAvatar() {
        this.uploadService.uploadImg(this.selectedFile).subscribe({});
    }

    /**
     * Удаление добавленного изображения
     */
    removeImg() {
        this.imgAcc = "";
        this.form.controls["profile_img"].setValue("");
    }

    /**
     * Отправка данных
     */
    onSubmit() {
        this.authService
            .register({
                ...this.form.value,
            })
            .subscribe({
                next: (response) => {
                    console.log("users create successfully", response);
                },
                error: (error) => {
                    console.log(error);
                    this.errors = [`${error.error.message}`];
                    // toast возникла ошибка при отправке данных
                },
                complete: () => {
                    this.pushAvatar();
                    this.router.navigate(["/login"]);
                    //     toast Удачная регистрация и переход на другой экран, набудующее
                },
            });
    }
}
