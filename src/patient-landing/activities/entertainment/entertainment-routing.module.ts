import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { EntertainmentComponent } from "./entertainment.component";

const entertainmentRoutes: Routes = [
    { path: "", component: EntertainmentComponent },
    { path: "entertainment", component: EntertainmentComponent}
    //adding names to the path or implementing a patient landing path turns my screen black
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(entertainmentRoutes)],
    exports: [NativeScriptRouterModule]
})
export class EntertainmentRoutingModule { }
