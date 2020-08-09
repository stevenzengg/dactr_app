import { Component, OnInit } from '@angular/core';

import { getSentimentService } from '../../../services/get-sentiment.service';
import { getNounsVerbsService } from '../../../services/get-nouns-verbs.service';

import { getString, setString, } from "tns-core-modules/application-settings";

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));
 
@Component({
    selector: 'feedback',
    providers: [getSentimentService, getNounsVerbsService],
    templateUrl: 'feedback.component.html'
})

export class FeedbackComponent implements OnInit {
    private pos_sentences: string[]
    private nouns: string[]
    private verbs: string[]
    
    constructor(private sentiment: getSentimentService, 
        private syntax: getNounsVerbsService) { }

    ngOnInit() { 
        
        // Obtain latest journal entry
        const journal = (function(): any{
            const journal_entries = user.collection("journal_entry");

            journal_entries.orderBy('timestamp').limit(1)
            .then(doc => { 
                return doc.journal;
            })
            .catch(error => {
                console.log(error)
                return null
            });            
        })();

        // Break journal into sentences
        const sentences = journal.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g);

        // Loop through each sentence, find sentiment, and collect positive sentences
        for(let sentence of sentences){
            this.sentimentQuery(sentence)
        }

        console.log("POS SENTENCES: ", this.pos_sentences);

        // for(let )

    }

    
    // Will query sentiment http request    
    private sentimentQuery(sentence){        
        this.sentiment.getSentiment(sentence)
        .subscribe((result) => {

            this.setSentimentResults(sentence, result)
        
        }, (error) => {
            
            console.log(error)
        
        });
    }

    // Will query nouns and verbs http request
    
    private syntaxQuery(sentence){
        this.syntax.getNounsVerbs(sentence)
            .subscribe((result) => {

                this.setSyntaxResults(result)

            }, (error) => {

                console.log(error)

            });
    }

    private setSentimentResults(sentence: string, result){
        if(result.sentiment.score > 0){ this.pos_sentences.push(sentence) }
    }

    private setSyntaxResults(result){
        this.nouns = this.nouns.concat(result.nouns)
        this.verbs = this.verbs.concat(result.verbs)
    }


    
}