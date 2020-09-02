import { Component, OnInit } from '@angular/core';
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
    
    public journalLog = [];
    public questionsLog = [];
    public timestamps = [];

    private showJournals = [];
    private showQuestions = [];
    private showTimestamps = [];
    
    private pointer = 0;

    public journalsLoaded = false;

    constructor() {}

    ngOnInit() {  

        this.setJournalLog().then(()=>{

            this.setShowElements();

            this.journalsLoaded = true;
        })
        .catch(e => {
            console.log('setJournal Error: ', e);
        });    
        
    }

    nextButton(){
        this.pointer += 3;
        if(this.pointer < this.timestamps.length){
            this.clearShowElements();
            this.setShowElements();

            // console.log('SHOW QUESTIONS: ', this.showQuestions)
            // console.log('SHOW JOURNALS: ', this.showJournals)
            // console.log('SHOW TIMESTAMPS: ', this.showTimestamps)
        } 
        else {
            this.pointer -= 3;

            console.log("CAN'T GO FORWARD ANY FURTHER, STOP");
        } 
    }

    backButton(){
        this.pointer -= 3;
        if(this.pointer < 0){
            this.pointer += 3;
            
            console.log("CAN'T GO BACK ANY FURTHER, STOP");
        }
        else{
            this.clearShowElements();
            this.setShowElements();

            // console.log('SHOW QUESTIONS: ', this.showQuestions)
            // console.log('SHOW JOURNALS: ', this.showJournals)
            // console.log('SHOW TIMESTAMPS: ', this.showTimestamps)
        }        
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

    private setShowElements(){
        try{
            for(let i = this.pointer; i < this.pointer + 3; i++){
                if(!this.journalLog[i]){throw new RangeError}
                this.showJournals.push(this.journalLog[i]);

                if(!this.questionsLog[i]){throw new RangeError}
                this.showQuestions.push(this.questionsLog[i]);

                if(!this.timestamps[i]){throw new RangeError}
                this.showTimestamps.push(this.timestamps[i]);
            }
        } catch(err){
            if(err instanceof RangeError){                
                while(this.showJournals.length < 3){ console.log('journal push'); this.showJournals.push(['...', '...', '...']); }
                while(this.showQuestions.length < 3){ console.log('question push'); this.showQuestions.push(['...', '...', '...']); }
                while(this.showTimestamps.length < 3){ console.log('timestamp push'); this.showTimestamps.push('...'); }

                console.log('OUT OF RANGE');
            } else {
                console.log("setShowElements Error: " + err)
            }
        }
    }

    private clearShowElements(){
        this.showJournals = [];
        this.showQuestions = [];
        this.showTimestamps = [];
        console.log('CLEARED: ', this.showJournals, this.showQuestions, this.showTimestamps)
    }

}