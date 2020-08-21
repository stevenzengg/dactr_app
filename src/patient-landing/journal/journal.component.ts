import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { getString, setString, } from "tns-core-modules/application-settings";

import { RouterExtensions } from '@nativescript/angular/router';

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));

@Component({
    selector: 'journal',
    providers: [],
    templateUrl: 'journal.component.html',
    styleUrls: ['journal.component.css']        
})


// We would import apis for Natural Language (Sentiment and Syntax) as well Places
// We would need to access Firebase Fire DataStore as well
export class JournalComponent implements OnInit {

    public journal  = "";
    
    // private sentiment: getSentimentService, private syntax: getNounsVerbsService
    constructor(private routerExtension: RouterExtensions){}

    ngOnInit() {}

    /*
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
      */

     
    // Submit journal and reroute to Feedback Component
    submitJournal(){        
        
        //Comment code underneath to stop writing into database
        user.collection("journal_entry").add({
            journal: this.journal,
            timestamp: firebase.firestore().FieldValue().serverTimestamp()
        });

        console.log('JOURNAL SUBMITTED: ', this.journal);

        console.log("Route to feedback page");
        //This navigates to feedback component after submitting journal
        this.routerExtension.navigate(['/feedback']);
         
    }
    
}