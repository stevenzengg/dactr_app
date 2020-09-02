import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { ArtComponent } from "./art.component";

const artRoutes: Routes = [
    { path: "art", component: ArtComponent}
    //adding names to the path or implementing a patient landing path turns my screen black
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(artRoutes)],
    exports: [NativeScriptRouterModule]
})
export class ArtRoutingModule { }
