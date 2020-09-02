import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { ClinicianProfileComponent } from "./clinician-profile.component";
import {AuthGuard} from "../../auth-guard.service";

const routes: Routes = [
    { path: "clinician-profile", component: ClinicianProfileComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ClinicianProfileRoutingModule { }