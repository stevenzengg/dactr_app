import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService, ModalDialogOptions } from "@nativescript/angular/modal-dialog";
import { FirebaseService } from '../services/firebase.service';
import { RouterExtensions} from '@nativescript/angular/router';
import { User } from '../models/user.model';
import { ModalComponent } from "../modal/modal.component";
import { ModalOtherComponent } from "../modal/modalother.component";
import { ModalEntertainmentComponent } from "../modal/modalentertainment.component";
import { ModalArtComponent } from "../modal/art/modalart.component";
import { getString } from "tns-core-modules/application-settings";


import * as utils from "tns-core-modules/utils/utils";
import * as appSettings from "tns-core-modules/application-settings";
import * as TNSPhone from 'nativescript-phone';

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});
const userCollection = firebase.firestore().collection("user_database");


@Component({
    selector: 'patient-landing',
    moduleId: module.id,
    templateUrl: './patient-landing.component.html',
    styleUrls: ["./patient-landing.component.css"],
    providers: [ModalDialogService]
})

export class PatientLandingComponent implements OnInit {
    welcomeMessage: string;
    firstName = appSettings.getString("firstName");
    lastName = appSettings.getString("lastName");
    email = appSettings.getString("email");

  //public first_name = userCollection.doc(getString("firstName"))
  //public last_name = userCollection.doc(getString("lastName"))
  //public email = userCollection.doc(getString("email"))

    constructor(private firebaseService: FirebaseService,
      private routerExtensions: RouterExtensions,
      private modalService: ModalDialogService,
      private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
      console.log("Patient Landing First Name: ", appSettings.getString("firstName"));
      console.log("Patient Landing Email: ", appSettings.getString("email"));
      this.welcomeMessage = "Hello, " + this.firstName;
    }
    logout() {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true } );
      }
    showExerciseDialog() {
      /*const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context: {}
    };
    this.modalService.showModal(ModalComponent, options);*/
    this.routerExtensions.navigate(['/outdoors']);

    }

    showArtDialog() {
      /*const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context: {}
    };
    this.modalService.showModal(ModalArtComponent, options); */
    this.routerExtensions.navigate(['art']);

    }

    showEntertainmentDialog() {
      /*const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context: {}
    };
    this.modalService.showModal(ModalEntertainmentComponent, options);*/
    this.routerExtensions.navigate(['/entertainment']);
    }

    showOtherDialog() {
      /*const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context: {}
    };
    this.modalService.showModal(ModalOtherComponent, options);*/
    this.routerExtensions.navigate(['/other']);
    }

    pAttackLink(){
      utils.openUrl('https://www.healthline.com/health/how-to-stop-a-panic-attack')
    }

    suicideTxt(){
      utils.openUrl('https://suicidepreventionlifeline.org/chat/')
        TNSPhone.sms(['1-800-273-8255'], '')
       .then((result) => {
          console.log(result);
        })
    }

    callHotline(){
      TNSPhone.dial("18002738255", true);

    }
    callPolice(){
      TNSPhone.dial("911", true);
    }

}
