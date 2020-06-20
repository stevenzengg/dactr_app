import { NgModule } from '@angular/core';
import { NativeScriptModule} from '@nativescript/angular/nativescript.module'

import { LoginComponent } from './login.component';

@NgModule({
    imports: [NativeScriptModule],
    exports: [LoginComponent],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule { }
