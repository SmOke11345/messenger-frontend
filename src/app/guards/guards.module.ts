import { AuthGuardChats } from "./auth.guard";
import { NgModule } from "@angular/core";

@NgModule({
    providers: [AuthGuardChats],
})
export class GuardsModule {
}