import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule, NativeScriptFormsModule } from "@nativescript/angular";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoginModule } from "./login/login.module";
import { PatientLandingModule } from './patient-landing/patient-landing.module';
import { RegisterModule} from "./register/register.module";

import * as firebase from "nativescript-plugin-firebase";

firebase.init({

}).then(() => console.log('Firebase intialized!'))
.catch(error => console.error(`Error: ${error}`));

firebase.login(
    {
        type: firebase.LoginType.PASSWORD,
    })
    .then(result => JSON.stringify(result))
    .catch(error => console.log(error));



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
        RegisterModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
