import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { EmergencyComponent } from "./emergency.component";

const routes: Routes = [
    { path: "emergency", component: EmergencyComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EmergencyRoutingModule { }