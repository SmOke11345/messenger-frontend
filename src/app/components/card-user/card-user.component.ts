import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

import { User } from "../../models/UserTypes";

@Component({
    selector: "card-user",
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: "./card-user.component.html",
    styleUrl: "./card-user.component.scss",
})
export class CardUserComponent implements OnChanges {
    @Input() userData: User | undefined;

    ngOnChanges(changes: SimpleChanges) {
        if (changes["userData"]) {
            console.log("user data changed", this.userData);
        }
    }
}
