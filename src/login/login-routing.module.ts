//Steven: use line 6 import
//Yajur: use line 7 import

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

//import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

import { LoginComponent } from "./login.component";

const routes: Routes = [
    { path: "", component: LoginComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class LoginRoutingModule { }