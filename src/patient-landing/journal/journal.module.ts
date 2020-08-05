import { NgModule } from '@angular/core';
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

import { JournalComponent } from './journal.component';

@NgModule({
    imports: [NativeScriptFormsModule],
    exports: [],
    declarations: [JournalComponent],
    providers: [],
})
export class JournalModule { }
