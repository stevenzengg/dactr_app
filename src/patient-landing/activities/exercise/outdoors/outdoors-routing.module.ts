import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { OutdoorsComponent } from "./outdoors.component";

const outdoorsRoutes: Routes = [
    { path: "outdoors", component: OutdoorsComponent}
    //adding names to the path or implementing a patient landing path turns my screen black
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(outdoorsRoutes)],
    exports: [NativeScriptRouterModule]
})
export class OutdoorsRoutingModule { }
