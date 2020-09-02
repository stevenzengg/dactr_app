import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import {RouterExtensions} from '@nativescript/angular/router';

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");

@Component({
    selector: 'clinician-landing',
    templateUrl: 'clinician-landing.component.html',
    styleUrls: ['clinician-landing.component.css']
})

export class ClinicianLandingComponent implements OnInit {
    constructor(private routerExtensions:RouterExtensions) { }

    private patientList = new Array<String>();

    ngOnInit() { }

    goToPatient()
    {
        console.log("Routing to clinician profile");
        this.routerExtensions.navigate(['/clinician-profile']);
    }

    
}