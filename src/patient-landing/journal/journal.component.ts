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
    sentimentScore: Number;
    nouns: Array<string>;
    verbs: Array<string>;
    
    constructor(private sentiment: getSentimentService,
        private syntax: getNounsVerbsService){}

    ngOnInit() {}

     
    // Master function for all processes
    submitJournal(){

        console.log(this.journal);

        //Comment code underneath to stop writing into database
        user.collection("journal_entry").add({
            journal: this.journal
        });

        // ACTIVITY RECOMMENDER
        
        let pos_sentences: string[]
        let nouns_verbs: undefined

        // Find positive sentences
        pos_sentences = this.analyzeSentiment();

        console.log('pos_sentences at end of sentiment analysis: ', pos_sentences)

        // Obtain nouns and verbs as a JSON
        // const nouns_verbs = this.nouns_verbs(pos_sentences);
        // console.log('nouns_verbs at end of syntax analysis: ', nouns_verbs)
    }
    
    /**
        Analyzes sentiment of each sentence in journal, returns list with all positively scored sentences

        Args: journal input

        Returns: list of all positively scored sentences in journal entry
     */
    private analyzeSentiment()
    {
        // List of positive sentences
        const pos_sentence_list = [];

        // Break journal into sentences
        const sentences = this.journal.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g); 

        for (let sentence of sentences){            
            // Obtain sentiment score
            // If greater than 0, append to pos_sentence_list

            this.sentimentQuery(sentence)
            
            console.log("SCORE: ", this.sentimentScore)

            if (this.sentimentScore > 0) {
                pos_sentence_list.push(sentence);
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
    private nouns_verbs(pos_sentence_list){

        const nouns_verbs = {
            nouns: [],
            verbs: [],
        };

        for (const sentence of pos_sentence_list)  {
            // Obtain nouns and verbs of positive sentences
            this.syntaxQuery(sentence)
            
            nouns_verbs.nouns = this.nouns
            nouns_verbs.verbs = this.verbs
        }
    
        return nouns_verbs
    }

    /*
        Will query sentiment http request
    */
    private sentimentQuery(sentence){        
        this.sentiment.getSentiment(sentence)
        .subscribe((result) => {

            this.setSentimentResults(result)
        
        }, (error) => {
            
            console.log(error)
        
        });
    }

    /*
        Will query nouns and verbs http request
    */
   private syntaxQuery(sentence){
        this.syntax.getNounsVerbs(sentence)
            .subscribe((result) => {
                this.setSyntaxResults(result)
            }, (error) => {
                console.log(error)
            });
    }
    /*
        Will extract data for sentiment http request
    */
    private setSentimentResults(result){
        this.sentimentScore = result.sentiment.score
    }

    /*
        Will extract data for nouns and verbs http request
    */
    private setSyntaxResults(result){
        this.nouns = result.nouns
        this.verbs = result.verbs
    }

}
