import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { LoginComponent } from "./login.component";
import { PatientLandingComponent } from "../patient-landing/patient-landing.component";

const loginRoutes: Routes = [
    { path: "", component: LoginComponent }
    //{ path: "patient-landing", component: PatientLandingComponent}
    //adding names to the path or implementing a patient landing path turns my screen black
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(loginRoutes)],
    exports: [NativeScriptRouterModule]
})
export class LoginRoutingModule { }
