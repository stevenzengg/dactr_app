import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular/router';
import { getSentimentService } from "../../services/get-sentiment.service";
import { getNounsVerbsService } from "../../services/get-nouns-verbs.service";
//import * as GooglePlaces from 'nativescript-plugin-google-places';
import { getString, setString, } from "tns-core-modules/application-settings"; 

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
    //sentimentScore: Number;
    //nouns: Array<string>;
    //verbs: Array<string>;

    private pos_sentences: string[]
    private nouns: string[]
    private verbs: string[]
    
    // private sentiment: getSentimentService, private syntax: getNounsVerbsService
    constructor(private sentiment: getSentimentService, private syntax: getNounsVerbsService,private router: RouterExtensions){
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
        // Obtain latest journal entry

        // const journal = this.findLatestJournal();
        // console.log("JOURNAL: ", journal)

        //let journal = 'Get your glizzy gobblers today! I am swimming tomorrow, care to join?'

        // Break journal into sentences
        const sentences = this.journal.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g);
        console.log("SENTENCES: ", sentences)

        // Loop through each sentence, find sentiment, and collect positive sentences
        for(let sentence of sentences){
            await this.sentimentQuery(sentence)
        }

        console.log("POS SENTENCES: ", this.pos_sentences);

        // Loop through each positive sentence and collect nouns and verbs
        for(let sentence of this.pos_sentences){
            await this.syntaxQuery(sentence)            
        }

        console.log('NOUNS: ', this.nouns)
        console.log('VERBS: ', this.verbs)
    }

    // Will find latest journal and return it
    private findLatestJournal(): any{
        const journal_entries = user.collection("journal_entry");

        let query = journal_entries.orderBy('timestamp', 'desc').limit(1)

        //console.log('query: ', query)

        query.get()
        .then(doc => {
            if(!doc.exists){
                console.log("Document doesn't exist");
            }
            else{
                console.log('docs: ', doc.data().journal)
                return doc.data().journal;
            }
        })
        .catch(error => {
            console.log(error)
        })       
        //console.log('findLatestJournal -> ', doc._docSnapshots.get('journal'))        
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

    // // Set up Feeddback
    // user.collection('activity_recommendation' --> each doc: "activity", fields: {frequency: 1, search_term: '', timestamp: firebase.firestore().FieldValue().serverTimestamp()})
    // (Return 2 activities that have highest frequency and 2 latest added activities


    // private getPlaces(this.nouns, this.verbs){
        
    
        // //Comment code underneath to stop writing into database
        // user.collection("journal_entry").add({
        //     journal: this.journal,
        //     timestamp: firebase.firestore().FieldValue().serverTimestamp()
        // });


    /*
           
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