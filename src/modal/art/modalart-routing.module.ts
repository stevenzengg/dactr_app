import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { ArtComponent } from "../../patient-landing/activities/art/art.component";
import { ModalComponent } from "../modal.component"


const modalartRoutes: Routes = [
    { path: "", component: ModalComponent },
    { path: "arcomponent", component: ArtComponent, pathMatch: "full"}
    //adding names to the path or implementing a patient landing path turns my screen black
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(modalartRoutes)],
    exports: [NativeScriptRouterModule]
})
export class ModalArtRoutingModule { }
