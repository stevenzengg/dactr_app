import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule} from '@nativescript/angular/nativescript.module'

import { LoginComponent } from './login.component';

@NgModule({
    imports: [NativeScriptModule],
    exports: [LoginComponent],
    declarations: [LoginComponent],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
