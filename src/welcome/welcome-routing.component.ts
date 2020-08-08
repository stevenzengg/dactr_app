import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import {WelcomeComponent} from "./welcome.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { ClinicianLoginModule } from "../clinician-login/clinician-login.module";


const welcomeRoutes: Routes = [
    { path: "", component: WelcomeComponent },
    { path: "login", loadChildren: () => import("../login/login.component").then(m => m.LoginComponent)},
    { path: "register", loadChildren: () => import("../register/register.module").then(m => m.RegisterModule)},
    { path: "clinician-login", component: ClinicianLoginModule}
    //{ path: "register", loadChildren: () => import("../register/register.module").then(m => m.RegisterModule)}
    //{ path: "patient-landing", component: PatientLandingComponent}
    //adding names to the path or implementing a patient landing path turns my screen black
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(welcomeRoutes)],
    exports: [NativeScriptRouterModule]
})
export class WelcomeRoutingModule { }
