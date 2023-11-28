import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    imports: [AppRoutingModule, HttpClientModule],
    providers: [],
})
export class AppModule {}
