import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { JournalComponent } from "./journal.component";
import { FeedbackComponent } from "./feedback/feedback.component";

const routes: Routes = [
    { path: "journal", component: JournalComponent },
    { path: "feedback", component: FeedbackComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class JournalRoutingModule { }
