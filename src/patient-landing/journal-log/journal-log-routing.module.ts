import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { JournalLogComponent } from "./journal-log.component";

const routes: Routes = [
    { path: "journal-log", component: JournalLogComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class JournalRoutingModule { }