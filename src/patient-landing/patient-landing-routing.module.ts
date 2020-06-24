import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PatientLandingComponent } from "./patient-landing.component";

const routes: Routes = [
    { path: "patient-landing", component: PatientLandingComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PatientLandingRoutingModule { }
