import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";

@NgModule({
    providers: [
        AppRoutingModule,
    ],
    imports: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}