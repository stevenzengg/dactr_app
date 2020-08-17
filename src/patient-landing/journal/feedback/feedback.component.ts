import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { getSentimentService } from "../../../services/get-sentiment.service";
import { getNounsVerbsService } from "../../../services/get-nouns-verbs.service";
import { getString, setString, } from "tns-core-modules/application-settings";

import{ getPlacesService } from "../../../services/getPlacesAPI.service"
import{ getLocationService } from "../../../services/getLocation.service"

import { Position, Marker, MapView } from "nativescript-google-maps-sdk";
import{ ImageSource, fromFile } from "tns-core-modules/image-source"

const mapsModule = require("nativescript-google-maps-sdk");
const firebase = require("nativescript-plugin-firebase/app");

//These two lines initialize Google Maps Map View
import {registerElement} from "@nativescript/angular/element-registry";
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

// Initializing the app and accessing user database
firebase.initializeApp({});
const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));


@Component({
    selector: 'feedback',
    providers: [getSentimentService, getNounsVerbsService, getPlacesService, getLocationService],
    templateUrl: 'feedback.component.html'
})

export class FeedbackComponent implements OnInit {
    
    public htmlString: string
    public icons: any[]
    public journal  = "";
    public mapsResult: any;

    //Google Map Variable Initialization
    public markerList =[];
    //public marker;
    public userLat="40.798214";
    public userLng=" -77.859909";
    public zoom = 8;

    //Activity List Initialization
    public activityList=[];
    public activityLoaded = false;

    private pos_sentences: string[];
    private nouns: string[];
    private verbs: string[];
    private mapsInputs: {};

    //@ViewChild("MapView") mapView: ElementRef;
    
    constructor(private sentiment: getSentimentService, 
        private syntax: getNounsVerbsService, 
        private search: getPlacesService,
        private loc: getLocationService) {

            this.htmlString = `<span>
                                <h1>HtmlView demo in <font color="blue">NativeScript</font> App</h1>
                            </span>`;

            this.pos_sentences = []
            this.nouns = []
            this.verbs = []      
            this.mapsInputs = {}
        }

    ngOnInit() {
        //this.feedback();
    }

   /* //Once Map Loads on HTML this function gets called
    onMapReady = (event) => {
        console.log("Event: ", event);
        console.log("Event obj: ", event.object);
        this.markerAdder(event.object);
    }
*/
    

        private mapView: MapView;

        private onMapReady(args): void {
            this.mapView = args.object;

            this.addMarker();
        }

        private addMarker(): void {
           /* console.log("Setting a marker...");
            var marker = new Marker();
            marker.position = Position.positionFromLatLng(-33.86, 151.20);
            marker.title = "Sydney";
            marker.snippet = "Australia";
            marker.userData = { index : 1};
            marker.icon = //some image
            this.mapView.addMarker(marker);
            */

            // Go through each recommended activity and provide its places markers
            let iconCounter = 0;

            this.feedback().then(() => {

                this.mapsResult.forEach(activity =>{
                    let places = []        
                    for(var i = 0; i < activity.json.results.length; i++)
                    {
                        places.push(activity.json.results[i]);
                        //To access activities this.mapsResult.json_0.results[i].name
                    }
            
                    //Loops through all the places and creates a marker for them
                    for(var i = 0; i < places.length; i++)
                    {
                        var marker = new Marker();
                        //console.log("Latitude of Place " , typeof places[i].geometry.location.lat);
                        //console.log("Longitude of Place " + places[i].geometry.location.lng);
                        marker.position = Position.positionFromLatLng(places[i].geometry.location.lat, places[i].geometry.location.lng);
                        //marker.position = {lat: this.placeName[i].geometry.location.lat, lng: this.placeName[i].geometry.location.lng};
                        // mapsModule.Position.positionFromLatLng();
                        //console.log('Type of marker.position: ', typeof marker.position);
                        //console.log('marker.position: ', marker.position);
                        //console.log("MapsModule Position: ", mapsModule.Position.positionFromLatLng(-33.86, 151.20));
                        marker.icon = this.icons[iconCounter];
                        marker.title = places[i].name;
                        marker.snippet = activity.activity
                        marker.userData = {index: 1};
            
                        //console.log('Marker: ', marker);
            
                        this.mapView.addMarker(marker);
                    }

                    iconCounter++;
            
                    console.log("Feedback Component: markerAdder(): Markers are all added");
            
                    //Loops through all the activities
                    
                    console.log("ACTIVITY: ", activity.activity)
                    this.activityList.push(activity.activity)                  
                    
                });

                this.activityLoaded = true;
            
            })
            .catch(error => {
                console.log('ERROR WITH MARKER ADDER: ', error)
            });

        }

        /*
            <GridLayout>
                <MapView (mapReady)="onMapReady($event)"></MapView>
            </GridLayout>
        */


    /*
    markerAdder(mapViewer)
    {
     //This function needs to wait for the function to end before continuing
     this.feedback().then(() => {
        for(var i = 0; i < this.mapsResult.json_0.results.length; i++)
        {
            this.placeName.push(this.mapsResult.json_0.results[i]);
            //To access activities this.mapsResult.json_0.results[i].name
        }

        //Loops through all the places and creates a marker for them
        for(var i = 0; i < this.placeName.length; i++)
        {
            var marker = new Marker();
            console.log("Latitude of Place " , typeof this.placeName[i].geometry.location.lat);
            console.log("Longitude of Place " + this.placeName[i].geometry.location.lng);
            marker.position = Position.positionFromLatLng(-33.86, 151.20);
            //marker.position = {lat: this.placeName[i].geometry.location.lat, lng: this.placeName[i].geometry.location.lng};
            // mapsModule.Position.positionFromLatLng();
            console.log('Type of marker.position: ', typeof marker.position);
            console.log('marker.position: ', marker.position);
            console.log("MapsModule Position: ", mapsModule.Position.positionFromLatLng(-33.86, 151.20));

            marker.title = this.placeName[i].name;
            marker.userData = {index: 1};

            console.log('Marker: ', marker);

            this.mapView.addMarker(marker);
        }

        console.log("Feedback Component: markerAdder(): Markers are all added");

        //Loops through all the activities
        //this.activityList.push(this.mapsResult.activity_0);

        })
        .catch(error => {
            console.log('ERROR WITH MARKER ADDER: ', error)
        });

        
    }
    */

    
    // Emergency alerter
    emergencyAlert(){
        // Turn journals into lowercase words
        let words = this.journal.toLowerCase().split(' ');

        // List of dangerous words
        let extreme = ['suicide', 'depression', 'depressed', 'kill', 'killed', 'killing', 'die', 'died', 'death', 'strangle', 'strangling', 'strangled', 'hang', 
        'hanging', 'hung', 'drown', 'drowning', 'drowned', 'suffer', 'suffering', 'suffered']
        let drugs = ['drug', 'drugs', 'dui',  'vape', 'vaping', 'juul', 'juuling', 'marijuana', 'meth', 'nicotine', 'heroine', 'morphine', 'lsd', 'acid']

        let extremeWords: string[]
        let drugsWords: string[]

        // See if journal contains a dangerous word
        for(let word in words){
            
            const extremeWord = extreme.find(badWord => badWord == word)
            const drugWord = drugs.find(badWord => badWord == word)

            if(extremeWord){
                extremeWords.push(extremeWord)
            }
            if(drugWord){
                drugsWords.push(drugWord)
            }            
        }

        // If journal has a dangerous word, let the user know
        if(extremeWords){
            // ngif something

            console.log('We noticed you mentioned certain words like: ')
            for(const element in extremeWords){
                console.log(element)
            }
            console.log('If you need support, please refer to the Emergencies page.')            
        }
        if(drugsWords){
            // ngif something

            console.log('We noticed you mentioned certain words like: ')
            for(const element in extremeWords){
                console.log(element)
            }
            console.log('Please refrain from taking drugs to or other harmful substances as a coping mechanism. If you need support, please refer to the Emergencies page.')            
        }        
        
    }

    // Master function for all processes
    async feedback(){
        try{
            // Obtain most recent journal
            let recentJournalQuery = user.collection('journal_entry').orderBy('timestamp', 'desc').limit(1);

            let journalSnapshots = await recentJournalQuery.get()
                
            journalSnapshots.forEach(doc => {
                this.journal = doc.data().journal;
                console.log('DATTTAAAA: ', doc.data())
            })

            if (this.journal === undefined || this.journal === null){
                console.log('JOURNAL IS UNDEFINED!!!! NOOOOOOOOO! ')
            }

            console.log('JOURNAL: ', this.journal);

        } catch(error) {
            console.log('ERROR WITH FEEDBACK() -> OBTAINING RECENT JOURNAL: ', error)
        }

        
        try{
            // Find and collect marker images
            // Preset 4, add more if more activity results               
            let icon1 = await ImageSource.fromResourceSync("maps_icons/red-dot.png")
            let icon2 = await ImageSource.fromResourceSync("maps_icons/blue-dot.png")
            let icon3 = await ImageSource.fromResourceSync("maps_icons/green-dot.png")
            let icon4 = await ImageSource.fromResourceSync("maps_icons/orange-dot.png")
            this.icons.push(icon1)
            this.icons.push(icon2)
            this.icons.push(icon3)
            this.icons.push(icon4)

            console.log('ICONS: ', this.icons)            

        } catch(error) {
            console.log('ERROR WITH LOADING MARKER ICONS: ', error);
            throw Error('ERROR WITH LOADING MARKER ICONS');
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

            return Promise.resolve();                      

        } catch(error) {
            console.log('ERROR WITH FEEDBACK() -> GETTING PLACES: ', error)
        }

    }

    // Will query Places http request
    async getPlaces(){
        const actFeedCollection = user.collection("activity_feedback");
        let recent = []
        let mostFreq = []
        let result = [{}, {}, {}, {}]  // Add another json for more results

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
                result[x]['json'] = await this.placesQuery(location[0], location[1], recent[x].searchTerm)
            }
            console.log('RESULT LIST AFTER RECENT: ', result)

            for(let x = 2; x < (mostFreq.length + 2); x++)
            { 
                result[x]['type'] = 'Most Frequent';
                result[x]['activity'] = mostFreq[x - 2].activity;
                result[x]['json'] = await this.placesQuery(location[0], location[1], mostFreq[x - 2].searchTerm)                        
            }
            console.log('RESULT LIST AFTER MOSTFREQ: ', result)
        }
        catch(error){
            console.log('ERROR WITH GET REQUEST: ', error)
        }
        

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
    
}