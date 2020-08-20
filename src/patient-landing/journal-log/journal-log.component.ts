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
    
    public journalLog = new Array<String>();
    public tempItems: any[] 
    public journalsLoaded = false;
    private journalEntry:JournalEntry;
    private journal:string;

    constructor() {
        this.tempItems = [
            {fruit: 'apple', color: 'red'},
            {fruit: 'pear', color: 'green'},
            {fruit: 'blueberry', color: 'blue'},
            {fruit: 'banana', color: 'yellow'},
        ];
     }

    ngOnInit() { 
        console.log(this.tempItems[0].fruit)
        console.log(this.tempItems[0].color)
        this.journalsLoaded = true;
        
        /*
        this.setJournalLog().then(()=>{
            console.log(this.journalLog[0]);
            this.journalsLoaded = true;
        })
        .catch(e => console.log(e))    
         */
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