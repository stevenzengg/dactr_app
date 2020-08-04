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

export class JournalComponent implements OnInit {
    public journal  = "";
    

    constructor() { }

    printJournal()
    {
        console.log(this.journal);

          //Comment code underneath to stop writing into database
       /* user.collection("journal_entry").doc("Journal 1").set({
            journal: this.journal
        })
        */
    }

    ngOnInit() { }
}