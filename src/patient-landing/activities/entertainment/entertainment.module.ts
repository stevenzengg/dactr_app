//Steven do not import nativescript module line 13
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "@nativescript/angular/common";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

import {EntertainmentRoutingModule} from './entertainment-routing.module'
import {EntertainmentComponent} from './entertainment.component'
@NgModule({
    imports: [
        NativeScriptCommonModule,
        EntertainmentRoutingModule,
        NativeScriptFormsModule,
    ],
    exports: [EntertainmentComponent],
    declarations: [EntertainmentComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EntertainmentModule { }



//do not import nativescript module, only import nativescript module in appmodule
