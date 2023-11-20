import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-root",
    standalone: true,
    template: "<router-outlet></router-outlet>",
    styleUrls: ["./app.component.scss"],
    imports: [RouterOutlet, CommonModule, HttpClientModule],
})
export class AppComponent {
    title = "messenger-frontend";
}
