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
    getDate(){
        let a = new Date();
        return 1+a.getMonth() + "/" + a.getDate() + "/" + a.getFullYear();
      }
    getTime(){
        let a = new Date();
        if(1+a.getHours() >12){
            return 1+a.getHours()-12 + ":" + a.getMinutes() + "PM"
        }
        return 1+a.getHours() + ":" + a.getMinutes() + "AM"
      }
    printJournal()
    {
        /* Uncomment to debug journal entry
        console.log(this.journal);
        console.log(firebase.firestore().FieldValue().serverTimestamp());
    */
          //Comment code underneath to stop writing into database
        //This code adds journal to database with journal and date fields
       user.collection("journal_entry").add({
            journal: this.journal,
            date: firebase.firestore().FieldValue().serverTimestamp()
        })
        
    }

    ngOnInit() { }
}
