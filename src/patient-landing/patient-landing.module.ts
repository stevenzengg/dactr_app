//Steven do not import nativescript module line 13
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "@nativescript/angular/common";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

import { PatientLandingRoutingModule } from "./patient-landing-routing.module";
import { PatientLandingComponent } from './patient-landing.component';

import {JournalModule} from './journal/journal.module';
import { ModalComponent } from "../modal/modal.component";
import { ModalOtherComponent } from "../modal/modalother.component";
import { ModalEntertainmentComponent } from "../modal/modalentertainment.component";
import { ModalArtComponent } from "../modal/modalart.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PatientLandingRoutingModule,
        NativeScriptFormsModule,
        JournalModule
    ],
    exports: [PatientLandingComponent],
    declarations: [PatientLandingComponent,
                ModalComponent,
                ModalArtComponent,
                ModalEntertainmentComponent,
                ModalOtherComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [ModalComponent,
                    ModalArtComponent,
                    ModalEntertainmentComponent,
                    ModalOtherComponent]
})
export class PatientLandingModule { }



//do not import nativescript module, only import nativescript module in appmodule
