import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { PatientLandingComponent } from "./patient-landing.component";
import {JournalComponent} from "./journal/journal.component";
import {JournalLogComponent} from "./journal-log/journal-log.component";
import { LoginModule } from "../login/login.module";
import {AuthGuard} from "../auth-guard.service";
import { ArtComponent } from "./activities/art/art.component";
import { EntertainmentComponent } from "./activities/entertainment/entertainment.component";
import { OtherComponent } from "./activities/other/other.component";
import { OutdoorsComponent } from "./activities/exercise/outdoors/outdoors.component";



const routes: Routes = [
    { path: "patient-landing", component: PatientLandingComponent, canActivate: [AuthGuard]},
    { path: "journal", component: JournalComponent},
    { path: "journal-log", component: JournalLogComponent},
    { path: "login", component: LoginModule},
    { path: "art", component: ArtComponent},
    { path: "entertainment", component: EntertainmentComponent},
    { path: "other", component: OtherComponent},
    { path: "outdoors", component: OutdoorsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PatientLandingRoutingModule { }
