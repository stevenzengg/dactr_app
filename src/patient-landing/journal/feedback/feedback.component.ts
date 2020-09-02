import { Component, OnInit } from '@angular/core';

import { getSentimentService } from "../../../services/get-sentiment.service";
import { getNounsVerbsService } from "../../../services/get-nouns-verbs.service";
import{ getPlacesService } from "../../../services/getPlacesAPI.service"
import{ getLocationService } from "../../../services/getLocation.service"

import * as appSettings from "tns-core-modules/application-settings";
import * as dialogs from "tns-core-modules/ui/dialogs";

import { Position, Marker, MapView } from "nativescript-google-maps-sdk";

const firebase = require("nativescript-plugin-firebase/app");

//These two lines initialize Google Maps Map View
import {registerElement} from "@nativescript/angular/element-registry";
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

// Initializing the app and accessing user database
firebase.initializeApp({});


@Component({
    selector: 'feedback',
    providers: [getSentimentService, getNounsVerbsService, getPlacesService, getLocationService],
    templateUrl: 'feedback.component.html',
    styleUrls: ['feedback.component.css']
})

export class FeedbackComponent implements OnInit {

    private userCollection = firebase.firestore().collection("user_database");
    private user = this.userCollection.doc(appSettings.getString("email"));
    
    public icons: any[]
    public journal  = "";
    public mapsResult: any;
    public isBusy: boolean = true;

    //Google Map Variable Initialization
    public markerList =[];
    public userLat="40.798214";
    public userLng=" -77.859909";
    public zoom = 10;
    public colorList = ["red", "blue", "green", "orange"];

    //Activity List Initialization
    public activityList=[];
    public feedbackList = [];
    public activityLoaded = false;

    //Warning detector
    public extremeWordAlert = false;
    public drugWordAlert = false;

    private pos_sentences: string[];
    private nouns: string[];
    private verbs: string[];
    private mapsInputs: {};
    
    constructor(private sentiment: getSentimentService, 
        private syntax: getNounsVerbsService, 
        private search: getPlacesService,
        private loc: getLocationService) {
            this.pos_sentences = []
            this.nouns = []
            this.verbs = []      
            this.mapsInputs = {}
        }

    ngOnInit() {}    
    
    // Maps and marker functions
    private mapView: MapView;

    private onMapReady(args): void {
        this.mapView = args.object;

        this.addMarker();
    }

    private addMarker(): void {

        // Go through each recommended activity and provide its places markers
        let iconCounter = 0;

        this.feedback().then(() => {

            this.mapsResult.forEach(activity =>{
                let places = []

                console.log("ACTIVITY: ", activity.activity)
                console.log("# OF PLACES: ", activity.json.results.length)
                
                for(var i = 0; i < activity.json.results.length; i++)
                {
                    places.push(activity.json.results[i]);
                    //To access activities this.mapsResult.json_0.results[i].name
                }

                console.log('PLACES ARRAY: ', places.length,' PLACES / 2: ', Math.floor(places.length/2))
        
                //Loops through all the places and creates a marker for them
                for(var i = 0; i < Math.floor(places.length/2) ; i++)
                {
                    var marker = new Marker();

                    marker.position = Position.positionFromLatLng(places[i].geometry.location.lat, places[i].geometry.location.lng);
                    marker.color = this.colorList[iconCounter];
                    marker.title = places[i].name;
                    marker.snippet = activity.activity
                    marker.userData = {index: 1};
        
                    console.log('Marker Title: ', marker.title);
        
                    this.mapView.addMarker(marker);
                }

                iconCounter++;
        
                console.log("Feedback Component: markerAdder(): Markers are all added");
        
                // Push activities to ListView
                if( places.length == 0 ){
                    this.activityList.push(activity.activity + ' (no locations nearby)' )                    
                } else {
                    this.activityList.push(activity.activity)
                }
                this.feedbackList.push(activity.feedback)
                
            });

            this.isBusy = false;
            this.activityLoaded = true;       
        
        })
        .catch(error => {
            console.log('ERROR WITH MARKER ADDER: ', error)
        });

    }  
    

    // Master function for all processes
    async feedback(){
        try{
            // Obtain most recent journal
            let recentJournalQuery = this.user.collection('journal_entry').orderBy('timestamp', 'desc').limit(1);

            let journalSnapshots = await recentJournalQuery.get()
                
            journalSnapshots.forEach(doc => {
                console.log('DATTTAAAA: ', doc.data())
                let entry = doc.data()

                this.journal = entry.answers[0] + ' ' + entry.answers[1] + ' ' + entry.answers[2]
            })

            if (this.journal === undefined || this.journal === null){
                console.log('JOURNAL IS UNDEFINED!!!! NOOOOOOOOO! ')
            }

            console.log('JOURNAL: ', this.journal);

            // Search for emergency words. Alert the user if found
            this.emergencyAlert();
            
            if(this.extremeWordAlert){
                await dialogs.alert({
                    title: "HELP IS AVAILABLE: Check the Emergency page",
                    message: "We noticed you mentioned concerning language in your entries related to depression. Please know that while life isn’t easy, you are valued and loved, and now is not the time to give up! It may not seem like it, but there’s a network of people all around you who care for you and want to see you succeed in this journey, you are not alone.  We encourage you to utilize the hotlines in the Emergency page, talking is one of the best ways to work through the problems you are facing.",
                    okButtonText: "Ok"
                })
            }
            if(this.drugWordAlert){
                await dialogs.alert({
                    title: "HELP IS AVAILABLE: Check the Emergency page",
                    message: "We noticed you mentioned concerning language in your entries related to drugs. When responsibilities pile up there seems to be no escape, it’s tough to find motivation to keep going. It’s why some people are attracted to drugs or other illicit substances, which can provide temporary relief of symptoms. However, drugs are highly dangerous and can intensify your existing mental health problems. Using them could get you arrested and even lead to diseases and death. There are sustainable ways to lower your symptoms, you only need to ask! Utilize the Emergency page to talk to a medical professional. We’re here for you!",
                    okButtonText: "Ok"
                })
            }

        } catch(error) {
            console.log('ERROR WITH FEEDBACK() -> OBTAINING RECENT JOURNAL: ', error)
        }
        
        try{
            // Await activity search with user journal
            await this.activity();
            
            console.log("FeedbackComponent: feedback(): this.activity returned")        
            
            // Clear these class variables
            this.pos_sentences = []
            this.nouns = []
            this.verbs = []

        } catch(error) {
            console.log('ERROR WITH FEEDBACK() -> ACTIVITY SEARCH: ', error)
        }

        try{
            // Await getPlaces function with 2 most recent and 2 most frequent activities
            let result = await this.getPlaces()
            console.log("FeedbackComponent: feedback(): this.getPlaces returned");

            //Clear class variable
            this.mapsInputs = []

            this.mapsResult = result;

            console.log('LENGTH OF mapsResult: ', this.mapsResult.length)
            console.log('ACTIVITIES IN mapsResult: ', this.mapsResult[0].activity, ' :: ', this.mapsResult[0].feedback)
            console.log('ACTIVITIES IN mapsResult: ', this.mapsResult[1].activity, ' :: ', this.mapsResult[1].feedback)
            console.log('ACTIVITIES IN mapsResult: ', this.mapsResult[2].activity, ' :: ', this.mapsResult[2].feedback)
            console.log('ACTIVITIES IN mapsResult: ', this.mapsResult[3].activity, ' :: ', this.mapsResult[3].feedback)

            return Promise.resolve();

        } catch(error) {
            console.log('ERROR WITH FEEDBACK() -> GETTING PLACES: ', error)
        }

    }

    // Emergency alerter
    private emergencyAlert(){
        // Turn journals into lowercase words without punctuation
        let journal = this.journal
        .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, '')
        .replace(/\s+/g, ' ');

        let words = journal.toLowerCase().split(' ');


        // List of dangerous words
        let extreme = ['suicide', 'depression', 'depressed', 'kill', 'killed', 'killing', 'die', 'died', 'death', 'strangle', 'strangling', 'strangled', 'hang', 
         'hanging', 'hung', 'drown', 'drowning', 'drowned', 'suffer', 'suffering', 'suffered']
        let drugs = ['drug', 'drugs', 'dui',  'vape', 'vaping', 'juul', 'juuling', 'marijuana', 'meth', 'nicotine', 'heroine', 'morphine', 'cocaine', 'lsd', 'acid',
         'weed', 'bud', 'smoke', 'smoked']

        let extremeWords = []
        let drugsWords = []

        // See if journal contains a dangerous word
        words.forEach(word =>{
            
            extreme.forEach(badWord => {
                if(badWord === word){
                    extremeWords.push(badWord)
                }                
            });

            drugs.forEach(badWord => {
                if(badWord === word){
                    drugsWords.push(badWord)
                }                
            });
        });

        // If journal has a dangerous word, let the user know
        if(extremeWords.length > 0){
            this.extremeWordAlert = true;
            console.log('BAD WORDS: ', extremeWords)          
        }
        if(drugsWords.length > 0){
            this.drugWordAlert = true;
            console.log('BAD WORDS: ', drugsWords)               
        }  
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

    // Will query Places http request
    async getPlaces(){
        const actFeedCollection = this.user.collection("activity_feedback");
        let recent = []
        let mostFreq = []
        let result = [{}, {}, {}, {}]  // Add another json for more results

        // Query to find two most recent activites
        const query = actFeedCollection.orderBy("timestamp", "desc").limit(2);
        
        let querySnapshot = await query.get()

        querySnapshot.forEach(doc => {
            recent.push(doc.data())
        });

        console.log('RECENT QUERY LIST: ', recent[0].activity, recent[1].activity)
    
        // Query to find two most popular activities
        const query2 = actFeedCollection.orderBy("frequency", "desc").limit(2);

        querySnapshot = await query2.get()
        
        querySnapshot.forEach(doc => {
            mostFreq.push(doc.data())
        }); 
        
        console.log('MOST FREQ QUERY LIST: ', mostFreq[0].activity, mostFreq[1].activity)
        
        // Obtain user location
        let location: any
        try{
            location = await this.loc.getLocation()
        }catch(error){
            console.log("THERE WAS AN ERROR WITH LOCATION SERVICE: ", error)
            location = [40.798214, -77.859909] // Penn State
        }
        console.log('LOCATION: ', location);
        //Updates the latitude and longitude values in the map view for HTML
        this.userLat = location[0];
        this.userLng = location[1];

        try{
            // For loop to call getPlacesFunction
            for(let x = 0; x < recent.length; x++)
            {
                result[x]['type'] = 'Recent Addition';
                result[x]['activity'] = recent[x].activity;
                result[x]['feedback'] = recent[x].feedback;
                result[x]['json'] = await this.placesQuery(location[0], location[1], recent[x].searchTerm)
            }
            console.log('RESULT LIST AFTER RECENT: ', result)

            for(let x = 2; x < (mostFreq.length + 2); x++)
            { 
                result[x]['type'] = 'Most Frequent';
                result[x]['activity'] = mostFreq[x-2].activity;
                result[x]['feedback'] = mostFreq[x-2].feedback;
                result[x]['json'] = await this.placesQuery(location[0], location[1], mostFreq[x - 2].searchTerm)                        
            }
            console.log('RESULT LIST AFTER MOSTFREQ: ', result)
        }
        catch(error){
            console.log('ERROR WITH GET REQUEST: ', error)
        }
        

        return result;
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
        let result = await this.search.getPlacesFunct(lat, long, searchTerm)//.toPromise()
        console.log('PLACE RETRIEVED')
        console.log('PLACE RESULT: ', typeof result)        
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
                    this.mapsInputs[doc.id] = [data.search_term, data.feedback];
                    console.log('ACTIVITY EXISTS: ', doc.id, ' ', data.search_term);
                }
            });
        }
        
    }

    // Will push new activities to user activity collection, or update current activity frequency 
    private async pushActivities(){

        // Connect to user's activities feedback collection
        const userActivities = this.user.collection("activity_feedback");

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
                    searchTerm: this.mapsInputs[activity][0],
                    feedback: this.mapsInputs[activity][1],
                    frequency: 1,
                    timestamp: firebase.firestore().FieldValue().serverTimestamp()
                })
            }
        }
    }
    
}