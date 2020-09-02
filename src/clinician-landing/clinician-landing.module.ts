import { NgModule } from '@angular/core';

import { ClinicianLandingComponent } from './clinician-landing.component';
import { ClinicianLandingRoutingModule} from './clinician-landing-routing.module';

@NgModule({
    imports: [ClinicianLandingRoutingModule],
    exports: [],
    declarations: [ClinicianLandingComponent],
    providers: [],
})
export class ClinicianLandingModule { }
