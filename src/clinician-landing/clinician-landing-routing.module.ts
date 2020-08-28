import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { ClinicianLandingComponent } from "./clinician-landing.component";
import { ClinicianLoginComponent } from "../clinician-login/clinician-login.component";
import { ClinicianProfileComponent} from './clinician-profile/clinician-profile.component'
import {AuthGuard} from "../auth-guard.service";

const routes: Routes = [
    { path: "clinician-landing", component: ClinicianLandingComponent, canActivate: [AuthGuard]},
    { path: "clinician-login", component: ClinicianLoginComponent},
    { path: "clinician-profile", component: ClinicianProfileComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ClinicianLandingRoutingModule { }