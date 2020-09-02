import { NgModule } from '@angular/core';
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { JournalComponent } from './journal.component';
import  { JournalRoutingModule} from './journal-routing.module';
import { ModalSuggestionComponent } from '../../modal/modalsuggestion.component';

@NgModule({
    imports: [NativeScriptFormsModule, JournalRoutingModule, NativeScriptCommonModule],
    exports: [],
    declarations: [JournalComponent, ModalSuggestionComponent],
    providers: [],
    entryComponents: [ModalSuggestionComponent]
})
export class JournalModule {} 

