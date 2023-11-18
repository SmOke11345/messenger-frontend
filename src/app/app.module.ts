import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";

// TODO: Что то не хватает AuthGuard для работы с AuthenticationService а именно HttpClient
@NgModule({
    providers: [
        AppRoutingModule,
    ],
    imports: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}