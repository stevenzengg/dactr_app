//Steven do not import nativescript module line 13
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "@nativescript/angular/common";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

import {ArtRoutingModule} from './art-routing.module'
import {ArtComponent} from './art.component'
@NgModule({
    imports: [
        NativeScriptCommonModule,
        ArtRoutingModule,
        NativeScriptFormsModule,
    ],
    exports: [ArtComponent],
    declarations: [ArtComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ArtModule { }



//do not import nativescript module, only import nativescript module in appmodule
