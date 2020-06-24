//Steven do not import nativescript module line 13
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { NativeScriptModule } from '@nativescript/angular/nativescript.module';
import { PatientLandingRoutingModule } from "./patient-landing-routing.module";
import { PatientLandingComponent } from './patient-landing.component';

@NgModule({
    imports: [
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        NativeScriptUICalendarModule,
        NativeScriptUIChartModule,
        NativeScriptUIDataFormModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptUIGaugeModule,
        NativeScriptCommonModule,
        PatientLandingRoutingModule,
        NativeScriptFormsModule,
        NativeScriptModule
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
