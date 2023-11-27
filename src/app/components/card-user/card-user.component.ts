import { Component, Input } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { User } from "../../models/UserTypes";

@Component({
    selector: "app-card-user",
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: "./card-user.component.html",
    styleUrl: "./card-user.component.scss",
})
export class CardUserComponent {
    @Input() userData: User | undefined;
}
