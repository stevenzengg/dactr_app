import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { PatientLandingComponent } from "./patient-landing.component";
import {JournalComponent} from "./journal/journal.component";
import {JournalLogComponent} from "./journal-log/journal-log.component";
import { LoginModule } from "../login/login.module";
import {AuthGuard} from "../auth-guard.service";

const routes: Routes = [
    { path: "patient-landing", component: PatientLandingComponent, canActivate: [AuthGuard]},
    { path: "journal", component: JournalComponent},
    { path: "journal-log", component: JournalLogComponent},
    { path: "login", component: LoginModule}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PatientLandingRoutingModule { }
