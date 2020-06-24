import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { LoginComponent } from "./login/login.component";



const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: "login", loadChildren: () => import("./login/login.module").then(m => m.LoginModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
