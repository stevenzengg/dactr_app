import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule} from '@nativescript/angular/nativescript.module';
import {NativeScriptFormsModule} from '@nativescript/angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule} from './login-routing.module';

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        LoginRoutingModule
    ],
    exports: [LoginComponent],
    declarations: [LoginComponent],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
