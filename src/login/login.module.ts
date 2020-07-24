//Steven do not import nativescript module line 13

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "@nativescript/angular/common";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from './login.component';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        LoginRoutingModule,
        NativeScriptFormsModule
    ],
    exports: [LoginComponent],
    declarations: [LoginComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
