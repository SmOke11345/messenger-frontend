import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthenticationService } from "../../service/authentication.service";
import { UploadImgService } from "../../service/upload-img.service";
import { Router, RouterLink } from "@angular/router";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@Component({
    selector: "messenger-register",
    standalone: true,
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    providers: [
        AuthenticationService,
        UploadImgService,
    ],
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
    // Используется только для вывода изображния
    imgAcc: string = "";

    show: boolean = false;
    inputType: string = "password";

    errors: string[] = [];
    form: FormGroup;
    // @ts-ignore
    selectedFile: File;

    constructor(
        private authService: AuthenticationService,
        private uploadService: UploadImgService,
        private router: Router,
    ) {
        this.form = new FormGroup({
            name: new FormControl(""),
            email: new FormControl(""),
            lastname: new FormControl(""),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(6),
            ]),
            profile_img: new FormControl(""),
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
        this.selectedFile = event.target.files[0];

        // Вывод изображения после получения
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.imgAcc = event.target.result;
        };
        reader.readAsDataURL(this.selectedFile);

        // Добавление в поле profile_img путь к изображению
        let filename = this.selectedFile.name;

        // TODO: добавлять какой либо путь к стандартной картинке,
        //  если пользователь не выбрал никакого изображения

        return this.form.controls["profile_img"].setValue(
            `https://localhost:3000/api/users/upload/${filename.replace(
                /\s+/g,
                "",
            )}`,
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
    }

    /**
     * Отправка данных
     */
    onSubmit() {
        this.authService
            .register({
                ...this.form.value,
                // password: bcrypt.hash(this.form.controls["password"].value, 10),
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
                    //     toast Удачная регистрация и переход на другой экран  , набудующее
                },
            });
    }
}
