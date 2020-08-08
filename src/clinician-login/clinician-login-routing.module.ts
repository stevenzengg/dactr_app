import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { ClinicianLoginComponent } from "./clinician-login.component";
import {ClinicianLandingComponent} from "../clinician-landing/clinician-landing.component";

const loginRoutes: Routes = [
    { path: "", component: ClinicianLoginComponent },
    { path: "clinician-login", component: ClinicianLoginComponent},
    { path: "clinician-landing", component: ClinicianLandingComponent}
    //adding names to the path or implementing a patient landing path turns my screen black
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(loginRoutes)],
    exports: [NativeScriptRouterModule]
})
export class ClinicianLoginRoutingModule { }