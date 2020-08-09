import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { JournalComponent } from "./journal.component";
import { FeedbackModule } from "./feedback/feedback.component"

const routes: Routes = [
    { path: "journal", component: JournalComponent },
    { path: "feedback", component: FeedbackModule }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class JournalRoutingModule { }
