import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { RegisterComponent } from "./register.component";
import { PatientLandingComponent } from "../patient-landing/patient-landing.component";
import { LoginComponent } from "../login/login.component";

const registerRoutes: Routes = [
    { path: "", component: RegisterComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent}
    //{ path: "patient-landing", component: PatientLandingComponent}
    //adding names to the path or implementing a patient landing path turns my screen black
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(registerRoutes)],
    exports: [NativeScriptRouterModule]
})
export class RegisterRoutingModule { }
