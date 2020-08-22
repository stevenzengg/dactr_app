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

    public journal1 = "";
    public journal2 = '';
    public journal3 = '';

    public question1 = '';
    public question2 = '';
    public question3 = '';

    private firstQs = [
        'How would you describe your mental and social well being at the moment?',
        'How would you describe the emotions you have been experiencing lately?',
        'What do you struggle with right now? What is going by easily?'
    ];
    private secondQs = [
        'What are some events or triggers that make you feel this way?',
        'What are the positive and negative contributors to where you are in life right now?',
        'Are there goals or standards you are trying to meet that make you feel the way you do?',
    ];
    private thirdQs = [
        'What are some activities or actions that could be worthwhile moving forward?',
        'What incremental steps can you take to maintain a positive mental and body image?',
        'In what ways do you intend to use your time effectively to improve your mental and physical self?'
    ];

    
    // private sentiment: getSentimentService, private syntax: getNounsVerbsService
    constructor(private routerExtension: RouterExtensions){}

    ngOnInit() {
        // Random question picker, will pick numbers (0 to [length of questions - 1])
        this.question1 = this.firstQs[Math.floor(Math.random() * this.firstQs.length)]
        this.question2 = this.secondQs[Math.floor(Math.random() * this.secondQs.length)]
        this.question3 = this.thirdQs[Math.floor(Math.random() * this.thirdQs.length)]
    }

    
    getDate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return `Journal for ${mm}/${dd}/${yyyy}`;
    }    

     
    // Submit journal and reroute to Feedback Component
    submitJournal(){        
        // Combine journals into 1
        const journal = this.journal1 + ' ' + this.journal2 + ' ' + this.journal3;

        //Comment code underneath to stop writing into database
        user.collection("journal_entry").add({
            journal: journal,
            timestamp: firebase.firestore().FieldValue().serverTimestamp()
        });

        console.log('JOURNAL SUBMITTED: ', journal);

        console.log("Route to feedback page");
        //This navigates to feedback component after submitting journal
        this.routerExtension.navigate(['/feedback']);
         
    }
    
}