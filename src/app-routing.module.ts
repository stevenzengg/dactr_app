import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { LoginComponent } from "./login/login.component";

import { AuthGuard } from "./auth-guard.service";

export const authProviders = [
    AuthGuard
];


const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full'},
    //{ path: "login", loadChildren: () => import("./login/login.module").then(m => m.LoginModule) }
    { path: "welcome", loadChildren: () => import("./welcome/welcome.module").then(m => m.WelcomeModule)}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
