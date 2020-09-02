import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import {WelcomeRoutingModule} from './welcome-routing.component'

@NgModule({
    imports: [WelcomeRoutingModule],
    exports: [WelcomeComponent],
    declarations: [WelcomeComponent],
    providers: [],
})
export class WelcomeModule { }
