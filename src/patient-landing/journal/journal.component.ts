import { Component, OnInit } from '@angular/core';

import {
    getString,
    setString,
  } from "tns-core-modules/application-settings";

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));

@Component({
    selector: 'journal',
    templateUrl: 'journal.component.html'    
})


// We would import apis for Natural Language (Sentiment and Syntax) as well Places
// We would need to access Firebase Fire DataStore as well
export class JournalComponent implements OnInit {
    public journal  = "";    
    
    constructor(){}

    printJournal()
    {
        console.log(this.journal);

          //Comment code underneath to stop writing into database
       user.collection("journal_entry").add({
            journal: this.journal
        })
        
    }

    ngOnInit() { }
}
