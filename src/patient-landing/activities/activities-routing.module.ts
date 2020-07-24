import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { ActivitiesComponent } from "./activities.component";

const routes: Routes = [
    { path: "activities", component: ActivitiesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ActivitiesRoutingModule { }