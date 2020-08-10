import { NgModule } from '@angular/core';

import { ClinicianProfileComponent } from './clinician-profile.component';
import { ClinicianProfileRoutingModule} from './clinician-profile-routing.module';

@NgModule({
    imports: [ClinicianProfileRoutingModule],
    exports: [],
    declarations: [ClinicianProfileComponent],
    providers: [],
})
export class ClinicianProfileModule { }
