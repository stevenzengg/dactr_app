import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import { NativeScriptCommonModule } from "@nativescript/angular/common";

import { FeedbackComponent } from './feedback.component';

@NgModule({
    imports: [NativeScriptCommonModule],
    exports: [],
    declarations: [FeedbackComponent],
    providers: [],
})
export class FeedbackModule { }
