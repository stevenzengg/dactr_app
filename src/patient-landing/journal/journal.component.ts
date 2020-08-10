import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular/router';
import { getSentimentService } from "../../services/get-sentiment.service";
import { getNounsVerbsService } from "../../services/get-nouns-verbs.service";

import { getString, setString, } from "tns-core-modules/application-settings";

import{ getPlacesService } from "../../services/getPlacesAPI.service"
import{ getLocationService } from "../../services/getLocation.service"

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));

@Component({
    selector: 'journal',
    providers: [getSentimentService, getNounsVerbsService, getPlacesService, getLocationService],
    templateUrl: 'journal.component.html'    
})


// We would import apis for Natural Language (Sentiment and Syntax) as well Places
// We would need to access Firebase Fire DataStore as well
export class JournalComponent implements OnInit {
    public journal  = "";
    //sentimentScore: Number;
    //nouns: Array<string>;
    //verbs: Array<string>;

    private pos_sentences: string[]
    private nouns: string[]
    private verbs: string[]
    private mapsInputs: {}
    
    // private sentiment: getSentimentService, private syntax: getNounsVerbsService
    constructor(private sentiment: getSentimentService, 
                private syntax: getNounsVerbsService,
                private router: RouterExtensions, 
                private search: getPlacesService,
                private location: getLocationService){
        this.pos_sentences = []
        this.nouns = []
        this.verbs = []
    }

    ngOnInit() {}

     
    // Master function for all processes
    submitJournal(){

        console.log(this.journal);
        /*
        //Comment code underneath to stop writing into database
        user.collection("journal_entry").add({
            journal: this.journal,
            timestamp: firebase.firestore().FieldValue().serverTimestamp()
        });
        */
        
        //this.router.navigate(['/feedback']);

        this.activity().then(() => console.log("WOOOOOOOOOOOO")).catch(error => console.log(error));
    }

    // ACTIVITY RECOMMENDER
    private async activity(){

        // Break journal into sentences
        const sentences = this.journal.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g);
        console.log("SENTENCES: ", sentences)

        // Loop through each sentence, find sentiment, and collect positive sentences
        for(let sentence of sentences){
            await this.sentimentQuery(sentence)
        }

        // Loop through each positive sentence and collect nouns and verbs
        for(let sentence of this.pos_sentences){
            await this.syntaxQuery(sentence)            
        }
    }

    private async mapsDatabaseQuery() {

        // const noun_list = this.nouns;
        // const verb_list = this.verbs;
        const activitySearch = firebase.firestore().collection("activity_search");
        const noun_doc = await activitySearch.doc("nouns").get()
        const verb_doc = await activitySearch.doc("verbs").get()
    
        for (let noun of this.nouns) {
            if (noun in noun_doc) {
                this.mapsInputs[noun] = noun_doc.noun
            }
        }
    
        for (let verb of this.verbs) {
            if (verb in verb_doc) {
                this.mapsInputs[verb] = verb_doc.verb
            }
        }
    }

    
    // Will query sentiment http request    
    private async sentimentQuery(sentence){
        let result = await this.sentiment.getSentiment(sentence).toPromise()
        console.log('SQ RESULT: ', result)
        console.log('SQ SENTENCE: ', sentence)
        this.setSentimentResults(sentence, result)
    }

    // Will query nouns and verbs http request    
    private async syntaxQuery(sentence){
        let result = await this.syntax.getNounsVerbs(sentence).toPromise()
        this.setSyntaxResults(result)
    }

    // Set pos_sentences
    private setSentimentResults(sentence: string, result){
        console.log('RES.SENT.SCORE: ', result.sentiment.score)
        console.log('RESULTS SENTENCE: ', sentence)
        console.log('POS_SENTENCES: ', this.pos_sentences)
        if(result.sentiment.score > 0){ this.pos_sentences.push(sentence) }
    }

    // Set nouns and verbs
    private setSyntaxResults(result){
        this.nouns = this.nouns.concat(result.nouns)
        this.verbs = this.verbs.concat(result.verbs)
    }


    // Will query Places http request
    private async searchQuery(lat, lon, noun_doc.noun){
        let result = await this.search.getPlacesFunct(lat, lon, noun_doc.noun).toPromise()
        this.searchQuery(result)

        


























        /*
        
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
    /*
    private analyzeSentiment()
    {
        // List of positive sentences
        const pos_sentence_list = [];

        // Break journal into sentences
        const sentences = this.journal.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g); 

        for (let sentence of sentences){            
            // Obtain sentiment score
            // If greater than 0, append to pos_sentence_list

            this.sentiment.getSentiment(sentence).toPromise((result) =>{
                this.setSentimentResults(result)
            })
            .then(_ => {
                console.log("SCORE: ", this.sentimentScore)

                if (this.sentimentScore > 0) {
                    pos_sentence_list.push(sentence);
                }

                console.log("CURRENT STATE OF POS_SENTENCE_LIST: ", pos_sentence_list)
                })
            .catch(error => {
                console.log(error)
            })          
            
        }
        
        return pos_sentence_list;              
    }
    */
   /*
   private analyzeSentiment()
   {
       // List of positive sentences
       const pos_sentence_list = [];

       // Break journal into sentences
       const sentences = this.journal.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g); 

       for (let sentence of sentences){            
           // Obtain sentiment score
           // If greater than 0, append to pos_sentence_list

           this.sentiment.getSentiment(sentence).toPromise((result) =>{
               this.setSentimentResults(result)
           })
           .then(_ => {
               console.log("SCORE: ", this.sentimentScore)

               if (this.sentimentScore > 0) {
                   pos_sentence_list.push(sentence);
               }

               console.log("CURRENT STATE OF POS_SENTENCE_LIST: ", pos_sentence_list)
               })
           .catch(error => {
               console.log(error)
           })          
           
       }
       
       return pos_sentence_list;              
   }
   */


    /**
     *  Obtains nouns and verbs of entered list of positive sentences

        Args: positive sentence list

        Returns: dictionary with nouns and verbs of sentences
     */
    /*
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
    // Will query sentiment http request
    
    private sentimentQuery(sentence){        
        this.sentiment.getSentiment(sentence)
        .subscribe((result) => {

            this.setSentimentResults(result)
        
        }, (error) => {
            
            console.log(error)
        
        });
    }
    */
    
    // Will query nouns and verbs http request
    /*
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
    
    private async setSentimentResults(sentence: string){
        let result = this.sentiment.sentimentQuery(sentence)
        Promise.resolve(this.sentimentScore = result.sentiment.score)
    }
    */
    /*
    private setSentimentResults(result){
        this.sentimentScore = result.sentiment.score;
    }

    /*
        Will extract data for nouns and verbs http request
    */
   /*
    private setSyntaxResults(result){
        this.nouns = result.nouns
        this.verbs = result.verbs
    }
    */

}
