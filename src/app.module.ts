import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule, NativeScriptFormsModule } from "@nativescript/angular";


import { AppRoutingModule, authProviders } from "./app-routing.module";
import { AppComponent } from "./app.component";


import { BackendService } from "./services/backend.service";
import { FirebaseService } from "./services/firebase.service";

import { LoginModule } from "./login/login.module";
import { PatientLandingModule } from './patient-landing/patient-landing.module';
import { RegisterModule} from "./register/register.module";
import {ClinicianLoginModule} from './clinician-login/clinician-login.module';
import {ClinicianLandingModule} from './clinician-landing/clinician-landing.module';





// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        LoginModule,
        PatientLandingModule,
        RegisterModule,
        ClinicianLoginModule,
        ClinicianLandingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        BackendService,
        FirebaseService,
        authProviders
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
