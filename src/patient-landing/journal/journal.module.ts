import { NgModule } from '@angular/core';
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

import { JournalComponent } from './journal.component';
import  { JournalRoutingModule} from './journal-routing.module';

@NgModule({
    imports: [NativeScriptFormsModule, JournalRoutingModule],
    exports: [],
    declarations: [JournalComponent],
    providers: [],
})
export class JournalModule {} 

