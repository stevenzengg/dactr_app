import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { OtherComponent } from "./other.component";

const otherRoutes: Routes = [
    { path: "other", component: OtherComponent}
    //adding names to the path or implementing a patient landing path turns my screen black
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(otherRoutes)],
    exports: [NativeScriptRouterModule]
})
export class OtherRoutingModule { }
