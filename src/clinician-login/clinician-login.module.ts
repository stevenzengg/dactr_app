import { NgModule } from '@angular/core';

import { ClinicianLoginComponent } from './clinician-login.component';
import { ClinicianLoginRoutingModule} from './clinician-login-routing.module';

import { NativeScriptCommonModule } from "@nativescript/angular/common";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

@NgModule({
    imports: [ClinicianLoginRoutingModule, NativeScriptCommonModule, NativeScriptFormsModule],
    exports: [],
    declarations: [ClinicianLoginComponent],
    providers: [],
})
export class ClinicianLoginModule { }
