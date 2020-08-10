import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");

@Component({
    selector: 'clinician-landing',
    templateUrl: 'clinician-landing.component.html'
})

export class ClinicianLandingComponent implements OnInit {
    constructor() { }

    private patientList = new Array<String>();

    ngOnInit() { }

    setPatientList()
    {
        userCollection.get({source: "server"}).then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);


                /*this.journal = doc.data().journal;
                this.journalEntry.journal = this.journal;
                */
                //This pushes journal entry into journal log array
                this.patientList.push(doc.data().firstName);
            });
        });
    }
}