import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlEnums } from "../models/Enums/UrlEnums";

@Injectable()
export class UploadImgService {
    constructor(private http: HttpClient) {}

    /**
     * Загрузка полученного изображения в backend
     * @param file
     */
    uploadImg(file: File) {
        const formData: FormData = new FormData();
        formData.append("file", file);
        return this.http.post(`${UrlEnums.URL_USERS}/upload`, formData);
    }
}
