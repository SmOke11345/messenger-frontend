import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class UploadImgService {
    constructor(private http: HttpClient) {}

    /**
     * Загрузка полученного изображения в backend
     * @param file
     */
    uploadImg(file: File) {
        const formData: FormData = new FormData();
        formData.append("file", file);
        return this.http.post(
            "http://localhost:3000/api/users/upload",
            formData,
        );
    }
}
