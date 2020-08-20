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
    templateUrl: 'journal-log.component.html',
    styleUrls: ['journal-log.component.css']
})

export class JournalLogComponent implements OnInit {
    
    //public tempItems: any[] 
    //public tempWarning = 'I would like to put you on notice that your action are being watched, and that any further violations of the companies employee policy may result in your termination. Please be extra careful in the way you conduct yourself from now on.'

    public journalLog = new Array<String>();    
    public journalsLoaded = false;
    private journalEntry:JournalEntry;
    private journal:string;

    constructor() {
        //this.tempItems = ['apple', 'pear', 'blueberry', 'banana']
     }

    ngOnInit() { 
        //this.journalsLoaded = true;
        
        
        this.setJournalLog().then(()=>{
            console.log(this.journalLog[0]);
            this.journalsLoaded = true;
        })
        .catch(e => console.log(e))    
        
    }

    async setJournalLog()
    {
        let querySnapshot = await user.collection("journal_entry").orderBy("timestamp", "desc").get({source: "server"})

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