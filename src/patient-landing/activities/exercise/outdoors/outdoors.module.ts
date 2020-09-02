//Steven do not import nativescript module line 13
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "@nativescript/angular/common";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

import {OutdoorsRoutingModule} from './outdoors-routing.module'
import {OutdoorsComponent} from './outdoors.component'
@NgModule({
    imports: [
        NativeScriptCommonModule,
        OutdoorsRoutingModule,
        NativeScriptFormsModule,
    ],
    exports: [OutdoorsComponent],
    declarations: [OutdoorsComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OutdoorsModule { }



//do not import nativescript module, only import nativescript module in appmodule
