//Steven do not import nativescript module line 13
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "@nativescript/angular/common";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

import { ModalArtRoutingModule } from "./modalart-routing.module";
import { ModalArtComponent} from './modalart.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ModalArtRoutingModule,
        NativeScriptFormsModule,
    ],
    exports: [ModalArtComponent],
    declarations: [ModalArtComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ModalArtModule { }



//do not import nativescript module, only import nativescript module in appmodule
