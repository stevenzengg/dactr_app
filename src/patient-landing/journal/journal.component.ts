import { Component, OnInit } from '@angular/core';
import { getSentimentService } from "../../services/get-sentiment.service";
import { getNounsVerbsService } from "../../services/get-nouns-verbs.service";

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
    providers: [getSentimentService, getNounsVerbsService],
    templateUrl: 'journal.component.html'    
})


// We would import apis for Natural Language (Sentiment and Syntax) as well Places
// We would need to access Firebase Fire DataStore as well
export class JournalComponent implements OnInit {
    public journal  = "";  
    
    constructor(private sentiment: getSentimentService,
        private syntax: getNounsVerbsService){}

    // Master function for all processes
    submitJournal(){

        console.log(this.journal);

        //Comment code underneath to stop writing into database
        user.collection("journal_entry").add({
            journal: this.journal
        });

        // ACTIVITY RECOMMENDER
        
        // Find positive sentences
        const pos_sentences = this.analyzeSentiment();
        console.log(pos_sentences)
        // Obtain nouns and verbs as a JSON
        const nouns_verbs = this.nouns_verbs(pos_sentences);
        console.log(nouns_verbs)
    }
    
    /**
        Analyzes sentiment of each sentence in journal, returns list with all positively scored sentences

        Args: journal input

        Returns: list of all positively scored sentences in journal entry
     */
    analyzeSentiment()
    {
        // List of positive sentences
        const pos_sentence_list = [];

        // Break journal into sentences
        const sentences = this.journal.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g);

        for (let sentence of sentences){            
            // Obtain sentiment score
            // If greater than 0, append to pos_sentence_list
            let score = this.sentiment.getSentimentScore(sentence);

            console.log("SCORE: ", score)

            if (score > 0) {
                pos_sentence_list.push(sentence)
            }

            console.log("CURRENT STATE OF POS_SENTENCE_LIST: ", pos_sentence_list)            
        }
        return pos_sentence_list;      
    }

    /**
     *  Obtains nouns and verbs of entered list of positive sentences

        Args: positive sentence list

        Returns: dictionary with nouns and verbs of sentences
     */
        nouns_verbs(pos_sentence_list){

            const nouns_verbs = {
                nouns: [],
                verbs: [],
            };

            for (const sentence of pos_sentence_list)  {
                // Obtain nouns and verbs of positive sentences               
                nouns_verbs.nouns = this.syntax.getNouns(sentence)                
                nouns_verbs.verbs = this.syntax.getVerbs(sentence)
            }
        
        return nouns_verbs
    }

    ngOnInit() { }
}
