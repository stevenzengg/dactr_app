//Steven do not import nativescript module line 13
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "@nativescript/angular/common";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

import {OtherRoutingModule} from './other-routing.module'
import {OtherComponent} from './other.component'
@NgModule({
    imports: [
        NativeScriptCommonModule,
        OtherRoutingModule,
        NativeScriptFormsModule,
    ],
    exports: [OtherComponent],
    declarations: [OtherComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OtherModule { }



//do not import nativescript module, only import nativescript module in appmodule
