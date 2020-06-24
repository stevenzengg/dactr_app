//Steven: use line 6 import
//Yajur: use line 7 import

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { LoginComponent } from "./login.component";
import { PatientLandingComponent } from "../patient-landing/patient-landing.component";

const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'patient-landing',
        component: PatientLandingComponent
    }

];


@NgModule({
    imports: [NativeScriptRouterModule.forChild(loginRoutes)],
    exports: [NativeScriptRouterModule]
})
export class LoginRoutingModule { }