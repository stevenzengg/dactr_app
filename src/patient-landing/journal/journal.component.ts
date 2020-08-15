import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { getSentimentService } from "../../services/get-sentiment.service";
import { getNounsVerbsService } from "../../services/get-nouns-verbs.service";
import { getString, setString, } from "tns-core-modules/application-settings";

import { RouterExtensions} from '@nativescript/angular/router';
import{ getPlacesService } from "../../services/getPlacesAPI.service"
import{ getLocationService } from "../../services/getLocation.service"
import { ModalSuggestionComponent } from "../../modal/modalsuggestion.component";
import { analytics } from 'nativescript-plugin-firebase';
const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));

@Component({
    selector: 'journal',
    providers: [getSentimentService, getNounsVerbsService, getPlacesService, getLocationService],
    templateUrl: 'journal.component.html',        
})


// We would import apis for Natural Language (Sentiment and Syntax) as well Places
// We would need to access Firebase Fire DataStore as well
export class JournalComponent implements OnInit {
    public journal  = "";
    private pos_sentences: string[]
    private nouns: string[]
    private verbs: string[]
    private mapsInputs: {}
    public mapsResult: any
    public placeName;

    
    // private sentiment: getSentimentService, private syntax: getNounsVerbsService
    constructor(private sentiment: getSentimentService, 
                private syntax: getNounsVerbsService, 
                private search: getPlacesService,
                private loc: getLocationService,  
                private viewContainerRef: ViewContainerRef,
                private routerExtension: RouterExtensions){
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

        console.log("Route to feedback page");
        //This navigates to feedback component after submitting journal
        this.routerExtension.navigate(['/feedback']);
        
        /*
        // Start activity search
        this.activity().then(() => {
            console.log("LETS GOOOOOOOOOOOOO")
            
            // Clear these class variables
            this.pos_sentences = []
            this.nouns = []
            this.verbs = []
            if(!this.mapsResult === undefined){
                this.mapsResult = undefined;
            }


            this.getPlaces().then(result => {
                console.log("LETS GOOOOOOOOO")

                //Clear class variable
                this.mapsInputs = []
                
                this.mapsResult = result;
                
                this.placeName = this.mapsResult.json_0.results[0].name;
                console.log("Checking place name");
                console.log(this.placeName);
                
                
    
            }).catch(error => console.log('PLACES METHOD ERROR: ', error));
        
        }).catch(error => {
            console.log('ACTIVITY METHOD ERROR: ', error)
        });
        */
         
    }
    /*
    // Will query Places http request
    async getPlaces(){
        const actFeedCollection = user.collection("activity_feedback");
        let recent = []
        let mostFreq = []
        let result = {}

        // Query to find two most recent activites
        const query = actFeedCollection.orderBy("timestamp", "desc").limit(2);
        
        let querySnapshot = await query.get()

        querySnapshot.forEach(doc => {
            recent.push(doc.data())
        });

        console.log('RECENT QUERY LIST: ', recent)
    
        // Query to find two most popular activities
        const query2 = actFeedCollection.orderBy("frequency", "desc").limit(2);

        querySnapshot = await query2.get()
        
        querySnapshot.forEach(doc => {
            mostFreq.push(doc.data())
        }); 
        
        console.log('MOST FREQ QUERY LIST: ', mostFreq)
        
        // Obtain user location
        let location: any
        try{
            location = await this.loc.getLocation()
        }catch(error){
            console.log("THERE WAS AN ERROR WITH LOCATION SERVICE: ", error)
            location = [40.798214, -77.859909] // Penn State
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

        for(let x = 2; x < (mostFreq.length + 2); x++)
        { 
            result['type_' + x] = 'Most Frequent';
            result['activity_' + x] = mostFreq[x - 2].activity;
            result['json_' + x] = await this.placesQuery(location[0], location[1], mostFreq[x - 2].searchTerm)                        
        }
        console.log('RESULT LIST AFTER MOSTFREQ: ', result)

        return result;
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

        // Compare nouns and verbs to those in activity_database and collect activities with their search term
        await this.activitiesDatabaseQuery()
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
    private async activitiesDatabaseQuery() {

        // Connect to activity database and combine nouns and verbs
        const activityDB = firebase.firestore().collection("activity_database");

        let keywords = []
        keywords = keywords.concat(this.nouns, this.verbs)

        console.log('KEYWORDS: ', keywords)
        
        for (let word of keywords) {
            // Search for noun in collection's keywords            
            const query = await activityDB.where("keywords", 'array-contains', word).get()

            query.forEach(doc => {
                if(doc.exists){
                    let data = doc.data()     
                    this.mapsInputs[doc.id] = data.search_term;
                    console.log('ACTIVITY EXISTS: ', doc.id, ' ', data.search_term);
                }
            });
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

            console.log("RECOMMENDATION FOUND: ", recommendation)

            if(recommendation){
                // Update frequency
                let freq = recommendation.frequency

                console.log('RECOMMENDATION EXISTS');

                const rec_doc = await userActivities.doc(docID)
                             
                await rec_doc.update({
                    frequency: freq + 1,
                    timestamp: firebase.firestore().FieldValue().serverTimestamp()
                })                
            }
            else {

                console.log("RECOMMENDATION DOESN'T EXIST");

                userActivities.add({
                    activity: activity,
                    searchTerm: this.mapsInputs[activity],
                    frequency: 1,
                    timestamp: firebase.firestore().FieldValue().serverTimestamp()
                })
            }
        }
    }
    */
}