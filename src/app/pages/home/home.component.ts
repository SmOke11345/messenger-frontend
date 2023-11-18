import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "messenger-home",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
    img = "../../assets/img/home/Illustration.jpg";
}
