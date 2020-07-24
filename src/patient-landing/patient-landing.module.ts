//Steven do not import nativescript module line 13
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { PatientLandingRoutingModule } from "./patient-landing-routing.module";
import { PatientLandingComponent } from './patient-landing.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PatientLandingRoutingModule,
        NativeScriptFormsModule
    ],
    exports: [PatientLandingComponent],
    declarations: [PatientLandingComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PatientLandingModule { }



//do not import nativescript module, only import nativescript module in appmodule
