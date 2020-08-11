import { Component, OnInit } from '@angular/core';
import {JournalEntry} from '../../models/journal-entry.model';
import {
    getString,
  } from "tns-core-modules/application-settings";


const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));

@Component({
    selector: 'journal-log',
    templateUrl: 'journal-log.component.html'
})

export class JournalLogComponent implements OnInit {
    
    public journalLog = new Array<String>();
    private journalEntry:JournalEntry;
    private journal:string;

    constructor() { }

    ngOnInit() { 
        this.setJournalLog().then(()=>{            
            console.log(this.journalLog[0]);
        })
        .catch(e => console.log(e))
    }

    async setJournalLog()
    {
        let querySnapshot = await user.collection("journal_entry").get({source: "server"})

        querySnapshot.forEach(doc => {
            // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);

            // console.log(doc.data().journal);

            /*this.journal = doc.data().journal;
            this.journalEntry.journal = this.journal;
            */
            //This pushes journal entry into journal log array
            this.journalLog.push(doc.data().journal);
        });        
    }
}