import { NgModule } from '@angular/core';

import { HelpComponent } from './help.component';
import { HelpRoutingModule } from './help-routing.module'

@NgModule({
    imports: [HelpRoutingModule],
    exports: [],
    declarations: [HelpComponent],
    providers: [],
})
export class HelpModule { }
