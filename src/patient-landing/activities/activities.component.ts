import { Component, OnInit } from '@angular/core';
import { getString, setString, } from "tns-core-modules/application-settings";


const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));


@Component({
    selector: 'activities',
    templateUrl: 'activities.component.html'
})

export class ActivitiesComponent implements OnInit {
    
    public activities: any;

    constructor() { }

    ngOnInit() { 
        this.getActivities().then(() => console.log(this.activities)).catch(e => console.log(e));
    }

    private async getActivities() {
        // const userActivityFeedback = user.collection("activity_feedback").doc(activity).get().data()
        const userActivityFeedback = user.collection("activity_feedback");
        const all_activities = await userActivityFeedback.get()
        const actListOrdered = []
        const activities = []
        const activitiesFreq = []

        const query = userActivityFeedback.orderBy("frequency", "desc");

        let querySnapshot = await query.get()

        querySnapshot.forEach(doc => {
            actListOrdered.push(doc.data())
        });
        
        for (let activity of actListOrdered) {
            activities.push(activity["activity"])
            activitiesFreq.push(activity["frequency"])
        }

        console.log(activities)
        console.log(activitiesFreq)

        Promise.resolve(this.activities = activities)
    }
}