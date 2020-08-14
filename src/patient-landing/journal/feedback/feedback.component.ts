import { Component, OnInit } from '@angular/core';

import { getSentimentService } from '../../../services/get-sentiment.service';
import { getNounsVerbsService } from '../../../services/get-nouns-verbs.service';

import { getString, setString, } from "tns-core-modules/application-settings";

//These two lines initialize Google Maps Map View
import {registerElement} from "@nativescript/angular/element-registry";
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

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
    
    public htmlString: string
    
    constructor(private sentiment: getSentimentService, 
        private syntax: getNounsVerbsService) { 

        this.htmlString = `<span>
                            <h1>HtmlView demo in <font color="blue">NativeScript</font> App</h1>
                        </span>`;
                        
        }

    ngOnInit() { 
        
        // Obtain latest journal entry
        const journal = this.findLatestJournal();
        console.log("JOURNAL: ", journal)

        // Break journal into sentences
        const sentences = journal.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g);
        console.log("SENTENCES: ", sentences)

        // Loop through each sentence, find sentiment, and collect positive sentences
        for(let sentence of sentences){
            this.sentimentQuery(sentence)
        }

        console.log("POS SENTENCES: ", this.pos_sentences);

        // Loop through each positive sentence and collect nouns and verbs
        for(let sentence of this.pos_sentences){
            this.syntaxQuery(sentence)            
        }

        console.log('NOUNS: ', this.nouns)
        console.log('VERBS: ', this.verbs)

    }

    // Will find latest journal and return it
    private findLatestJournal(): any{
        const journal_entries = user.collection("journal_entry");

        journal_entries.orderBy('timestamp', 'desc').limit(1).get()
        .then(doc => { 
            return doc.journal;
        })
        .catch(error => {
            console.log(error)
            return null
        });
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

    // Set pos_sentences
    private setSentimentResults(sentence: string, result){
        if(result.sentiment.score > 0){ this.pos_sentences.push(sentence) }
    }

    // Set nouns and verbs
    private setSyntaxResults(result){
        this.nouns = this.nouns.concat(result.nouns)
        this.verbs = this.verbs.concat(result.verbs)
    }


    
}