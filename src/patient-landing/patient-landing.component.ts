import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { FirebaseService } from '../services/firebase.service';
import { RouterExtensions} from '@nativescript/angular/router';
import { User } from '../models/user.model';
import { ModalComponent } from "../modal/modal.component";
import { ModalOtherComponent } from "../modal/modalother.component";
import { ModalEntertainmentComponent } from "../modal/modalentertainment.component";
import { ModalArtComponent } from "../modal/art/modalart.component";

import * as appSettings from "tns-core-modules/application-settings";
import * as TNSPhone from 'nativescript-phone';



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


    constructor(private firebaseService: FirebaseService, 
      private routerExtensions: RouterExtensions, 
      private modalService: ModalDialogService, 
      private viewContainerRef: ViewContainerRef) { 
    }

    ngOnInit() { 
      console.log(appSettings.getString("firstName"));
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
    
    callContacts(){

    }
    callTherapist(){

    }
    callHotline(){
      TNSPhone.dial("18002738255", true);

    }
    callPolice(){
      TNSPhone.dial("911", true);

      
    }

}
