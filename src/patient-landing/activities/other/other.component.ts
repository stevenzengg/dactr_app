import { Component, OnInit } from '@angular/core';
import * as appSettings from "tns-core-modules/application-settings";


const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(appSettings.getString("email"));

@Component({
    selector: 'other',
    providers: [],
    templateUrl: 'other.component.html',
    styleUrls: ['other.component.css']
})

export class OtherComponent implements OnInit {
    public activities = [];
    public feedback = [];
    public frequency = [];

    private showActivities = [];
    private showFeedback = [];
    private showFrequency = [];
    
    private pointer = 0;

    public activitiesLoaded = false;

    constructor() {}

    ngOnInit() {  

        this.setActivities().then(()=>{

            this.setShowElements();

            this.activitiesLoaded = true;
        })
        .catch(e => {
            console.log('setJournal Error: ', e);
        });    
        
    }

    nextButton(){
        this.pointer += 3;
        if(this.pointer < this.frequency.length){
            this.clearShowElements();
            this.setShowElements();

            // console.log('SHOW QUESTIONS: ', this.showQuestions)
            // console.log('SHOW JOURNALS: ', this.showJournals)
            // console.log('SHOW TIMESTAMPS: ', this.showTimestamps)
        } 
        else {
            this.pointer -= 3;

            console.log("CAN'T GO FORWARD ANY FURTHER, STOP");
        } 
    }

    backButton(){
        this.pointer -= 3;
        if(this.pointer < 0){
            this.pointer += 3;
            
            console.log("CAN'T GO BACK ANY FURTHER, STOP");
        }
        else{
            this.clearShowElements();
            this.setShowElements();

            // console.log('SHOW QUESTIONS: ', this.showQuestions)
            // console.log('SHOW JOURNALS: ', this.showJournals)
            // console.log('SHOW TIMESTAMPS: ', this.showTimestamps)
        }        
    }

    async setActivities()
    {
        console.log(appSettings.getString("email"));

        let querySnapshot = await user.collection("activity_feedback").orderBy("frequency", "desc").get({source: "server"})

        querySnapshot.forEach(doc => {
            let entry = doc.data();
            //This pushes journal questions and respective answers
            this.activities.push(entry.activity)
            this.feedback.push(entry.feedback)
            this.frequency.push(entry.frequency)
        });
    }

    private setShowElements(){
        try{
            for(let i = this.pointer; i < this.pointer + 3; i++){
                if(!this.activities[i]){throw new RangeError}
                this.showActivities.push(this.activities[i]);

                if(!this.feedback[i]){throw new RangeError}
                this.showFeedback.push(this.feedback[i]);

                if(!this.frequency[i]){throw new RangeError}
                this.showFrequency.push('Frequency: ' + this.frequency[i]);
            }
        } catch(err){
            if(err instanceof RangeError){                
                while(this.showActivities.length < 3){ console.log('activity push'); this.showActivities.push('...'); }
                while(this.showFeedback.length < 3){ console.log('feedback push'); this.showFeedback.push('...'); }
                while(this.showFrequency.length < 3){ console.log('frequency push'); this.showFrequency.push('...'); }

                console.log('OUT OF RANGE');
            } else {
                console.log("setShowElements Error: " + err)
            }
        }
    }

    private clearShowElements(){
        this.showActivities = [];
        this.showFeedback = [];
        this.showFrequency = [];
        console.log('CLEARED: ', this.showActivities, this.showFeedback, this.showFrequency)
    }




    
    // findRecipes(){
    //     utils.openUrl("https://www.tasteofhome.com/collection/easy-recipes-to-know-by-heart/")
    // }
    // readEating(){
    //     utils.openUrl("https://www.medicalnewstoday.com/articles/322268")
    // }
}