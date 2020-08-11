import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular/router';
import { getSentimentService } from "../../services/get-sentiment.service";
import { getNounsVerbsService } from "../../services/get-nouns-verbs.service";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { getString, setString, } from "tns-core-modules/application-settings";

import{ getPlacesService } from "../../services/getPlacesAPI.service"
//import{ getLocationService } from "../../services/getLocation.service"
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get
import { ModalSuggestionComponent } from "../../modal/modalsuggestion.component";
const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));

@Component({
    selector: 'journal',
    providers: [ModalDialogService, getSentimentService, getNounsVerbsService, getPlacesService],
    templateUrl: 'journal.component.html',
        
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

    public mapsResult: any
    public placeName;

    
    // private sentiment: getSentimentService, private syntax: getNounsVerbsService
    constructor(private sentiment: getSentimentService, 
                private syntax: getNounsVerbsService,
                private router: RouterExtensions, 
                private search: getPlacesService, 
                private modalService: ModalDialogService, 
                private viewContainerRef: ViewContainerRef){
        this.pos_sentences = []
        this.nouns = []
        this.verbs = []
        this.mapsInputs = []
    }

    ngOnInit() {}

    getDate(){
        let a = new Date();
        return 1+a.getMonth() + "/" + a.getDate() + "/" + a.getFullYear();
      }
    getTime(){
        let a = new Date();
        if(1+a.getHours() >12){
            return 1+a.getHours()-12 + ":" + a.getMinutes() + "PM"
        }
        return 1+a.getHours() + ":" + a.getMinutes() + "AM"
      }

     
    // Master function for all processes
    submitJournal(){

        console.log(this.journal);
        
        //Comment code underneath to stop writing into database
        user.collection("journal_entry").add({
            journal: this.journal,
            timestamp: firebase.firestore().FieldValue().serverTimestamp()
        });
        
        this.activity().then(() => {
            console.log("LETS GOOOOOOOOOOOOO")

            this.getPlaces().then(result => {
                console.log("LETS GOOOOOOOOO")
    
                this.mapsResult = result;
                
                this.placeName = this.mapsResult.json_0.results[0].name;
                console.log("Checking place name");
                console.log(this.placeName);           
    
            }).catch(error => console.log(error));
        
        }).catch(error => console.log(error));

         
    }
    openModal(){
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: true, 
            context: {}
        };
        this.modalService.showModal(ModalSuggestionComponent, options);
    }

    // Will query Places http request
    async getPlaces(){
        const actFeedCollection = user.collection("activity_feedback");
        let recent = []
        let mostFreq = []
        let result = {}

        // Query to find two most recent activites
        const query = actFeedCollection
            .orderBy("timestamp", "desc")
            .limit(2);
        
        let querySnapshot = await query.get()

        querySnapshot.forEach(doc => {
            recent.push(doc.data())
        });

        console.log('RECENT QUERY LIST: ', recent)
    
        // Query to find two most popular activities
        const query2 = actFeedCollection
            .orderBy("frequency", "desc")
            .limit(2);

        querySnapshot = await query2.get()
        
        querySnapshot.forEach(doc => {
            mostFreq.push(doc.data())
        }); 
        
        console.log('MOST FREQ QUERY LIST: ', mostFreq)
        
        let location: any
        try{
            // getLatLot call -- obtain user location
            //location = this.locationService.getLatLot();
            await geolocation.enableLocationRequest();
            if(geolocation.isEnabled){
                let currentLocation = await geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 });
                location = [currentLocation.latitude, currentLocation.longitude]
            }
            else{
                console.log('LOCATION NOT ENABLED')
                location = [40.798214, -77.859909]
            }

        }catch(error){
            console.log("THERE'S AN ERROR: ", error)
            location = [40.798214, -77.859909]
        }

        console.log('LOCATION: ', location)

        // For loop to call getPlacesFunction
        for(let x = 0; x < recent.length; x++)
        {
            result['type_' + x] = 'Recent Addition';
            result['activity_' + x] = recent[x].activity;
            result['json_' + x] = await this.placesQuery(location[0], location[1], recent[x].searchTerm)
        }
        console.log('RESULT LIST AFTER RECENT: ', result)
        for(let x = 0; x < mostFreq.length; x++)
        { 
            result['type_' + x] = 'Most Frequent';
            result['activity_' + x] = mostFreq[x].activity;
            result['json_' + x] = await this.placesQuery(location[0], location[1], mostFreq[x].searchTerm)                        
        }
        console.log('RESULT LIST AFTER MOSTFREQ: ', result)

        return result;

        // result[0][2]['place']
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
        console.log("POS_SENTENCES: ", this.pos_sentences)

        // Loop through each positive sentence and collect nouns and verbs
        for(let sentence of this.pos_sentences){
            await this.syntaxQuery(sentence)            
        }
        console.log("NOUNS AND VERBS: ", this.nouns, this.verbs)

        // Compare nouns and verbs to those in activity_search and collect activities with their search term
        await this.mapsDatabaseQuery()
        console.log('MAPS INPUTS: ', this.mapsInputs)

        // Push new activities to user activity database. If already present, update frequency
        await this.pushActivities()
    }

        
    // Will query sentiment http request    
    private async sentimentQuery(sentence){
        let result = await this.sentiment.getSentiment(sentence).toPromise()
        this.setSentimentResults(sentence, result)
    }

    // Will query nouns and verbs http request    
    private async syntaxQuery(sentence){
        let result = await this.syntax.getNounsVerbs(sentence).toPromise()
        this.setSyntaxResults(result)
    }

    // Will query places request
    private async placesQuery(lat, long, searchTerm){
        let result = await this.search.getPlacesFunct(lat, long, searchTerm).toPromise()
        return result;
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

    // Will find nouns and verbs that are activities and return them with their search term
    private async mapsDatabaseQuery() {
        // const noun_list = this.nouns;
        // const verb_list = this.verbs;
        const activitySearch = firebase.firestore().collection("activity_search");
        const noun_doc = await activitySearch.doc("nouns").get()
        const verb_doc = await activitySearch.doc("verbs").get()

        console.log("TYPE OF NOUN_DOC: ", typeof noun_doc)

        const noun_JSON = noun_doc.data()
        const verb_JSON = verb_doc.data()

    
        for (let noun of this.nouns) {
            if (noun in noun_JSON) {
                this.mapsInputs[noun] = noun_JSON[noun]
            }
        }
    
        for (let verb of this.verbs) {
            if (verb in verb_JSON) {
                this.mapsInputs[verb] = verb_JSON[verb]
            }
        }
    }

    // Will push new activities to user activity collection, or update current activity frequency 
    private async pushActivities(){

        // Connect to user's activities feedback collection
        const userActivities = user.collection("activity_feedback");


        // Go through MapsInput and add to activities feedback collection
        for (let activity in this.mapsInputs) {       

            let snapshot = await userActivities.where('activity', '==', activity).get();
            let recommendation: any;
            let docID: any;
            snapshot.forEach(doc => {
                recommendation = doc.data();
                docID = doc.id;
            })

            console.log("DOC ID: ", docID)

            console.log("RECOMMENDATION: ", recommendation)

            if(recommendation){
                // Update frequency
                let freq = recommendation.frequency

                console.log('RECOMMENDATION EXISTS');

                const rec_doc = await userActivities.doc(docID)
                             
                await rec_doc.update({
                    frequency: freq + 1
                })                
            }
            else {
                userActivities.add({
                    activity: activity,
                    searchTerm: this.mapsInputs[activity],
                    frequency: 1,
                    timestamp: firebase.firestore().FieldValue().serverTimestamp()
                })
            }
        }
    }
    

    

    

        

























        
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
