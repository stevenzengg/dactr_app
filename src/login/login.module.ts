import { NgModule } from '@angular/core';
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from './login.component';

@NgModule({
    imports: [NativeScriptModule],
    exports: [LoginComponent],
    declarations: [LoginComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
