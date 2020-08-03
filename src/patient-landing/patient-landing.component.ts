import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { RouterExtensions} from '@nativescript/angular/router';
import { User } from '../models/user.model';

import * as appSettings from "tns-core-modules/application-settings";


@Component({
    selector: 'patient-landing',
    moduleId: module.id,
    templateUrl: './patient-landing.component.html',
    styleUrls: ["./patient-landing.component.css"]
})

export class PatientLandingComponent implements OnInit {
    dialogExerciseOpen = false;
    dialogArtOpen = false;
    dialogEntertainmentOpen = false;
    dialogOtherOpen = false;
    welcomeMessage: string;
    firstName = appSettings.getString("firstName");


    constructor(private firebaseService: FirebaseService, private routerExtensions: RouterExtensions) { 
      
      this.welcomeMessage = "Hello, " + this.firstName;
      appSettings.remove("firstName");
    }

    ngOnInit() { }

    logout() {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true } );
      }
    showExerciseDialog() {
      this.dialogExerciseOpen = true;
    }

    closeExerciseDialog() {
      this.dialogExerciseOpen = false;
    }
    showArtDialog() {
      this.dialogArtOpen = true;
    }

    closeArtDialog() {
      this.dialogArtOpen = false;
    }
    showEntertainmentDialog() {
      this.dialogEntertainmentOpen = true;
    }

    closeEntertainmentDialog() {
      this.dialogEntertainmentOpen = false;
    }
    showOtherDialog() {
      this.dialogOtherOpen = true;
    }

    closeOtherDialog() {
      this.dialogOtherOpen = false;
    }
}
