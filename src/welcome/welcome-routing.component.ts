import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import {WelcomeComponent} from "./welcome.component";
import { LoginComponent } from "../login/login.component";

const welcomeRoutes: Routes = [
    { path: "", component: WelcomeComponent },
    { path: "login", component: LoginComponent}
    //{ path: "patient-landing", component: PatientLandingComponent}
    //adding names to the path or implementing a patient landing path turns my screen black
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(welcomeRoutes)],
    exports: [NativeScriptRouterModule]
})
export class WelcomeRoutingModule { }