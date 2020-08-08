import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { ClinicianLandingComponent } from "./clinician-landing.component";
import { ClinicianLoginComponent } from "../clinician-login/clinician-login.component";
import {AuthGuard} from "../auth-guard.service";

const routes: Routes = [
    { path: "clinician-landing", component: ClinicianLandingComponent, canActivate: [AuthGuard]},
    { path: "clinician-login", component: ClinicianLoginComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ClinicianLandingRoutingModule { }