import { Component, OnInit } from '@angular/core';
import {JournalEntry} from '../../models/journal-entry.model';
import * as appSettings from "tns-core-modules/application-settings";


const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(appSettings.getString("email"));

@Component({
    selector: 'journal-log',
    templateUrl: 'journal-log.component.html',
    styleUrls: ['journal-log.component.css']
})

export class JournalLogComponent implements OnInit {
    
    //public tempItems: any[] 
    //public tempWarning = 'I would like to put you on notice that your action are being watched, and that any further violations of the companies employee policy may result in your termination. Please be extra careful in the way you conduct yourself from now on.'

    public journalLog = [];
    public questionsLog = [];
    public timestamps = [];

    public journalsLoaded = false;

    constructor() {}

    ngOnInit() {  

        this.setJournalLog().then(()=>{
            console.log(this.questionsLog);
            this.journalsLoaded = true;
        })
        .catch(e => console.log(e))    
        
    }

    async setJournalLog()
    {
        console.log(appSettings.getString("email"));

        let querySnapshot = await user.collection("journal_entry").orderBy("timestamp", "desc").get({source: "server"})

        querySnapshot.forEach(doc => {
            let entry = doc.data();
            //This pushes journal questions and respective answers
            this.questionsLog.push(entry.questions)
            this.journalLog.push(entry.answers)
            this.timestamps.push(entry.timestamp)            
        });
    }
}