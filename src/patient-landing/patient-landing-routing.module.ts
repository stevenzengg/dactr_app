import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { PatientLandingComponent } from "./patient-landing.component";
import {JournalComponent} from "./journal/journal.component";
import { LoginModule } from "../login/login.module";

const routes: Routes = [
    { path: "patient-landing", component: PatientLandingComponent },
    { path: "journal", component: JournalComponent},
    { path: "login", component: LoginModule}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PatientLandingRoutingModule { }
