//need to check password confirmation
import { Component, OnInit } from '@angular/core';

import { User } from "../models/user.model";
import  { FirebaseService } from "../services/firebase.service";

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const activityCollection = firebase.firestore().collection("activity_database")

import {RouterExtensions} from '@nativescript/angular/router';
import { registerElement } from '@nativescript/angular';
import { async } from 'rxjs/internal/scheduler/async';


@Component({
    selector: "register",
    moduleId: module.id,
    templateUrl: "register.component.html",
    styleUrls: ["register.component.css"]
})


export class RegisterComponent implements OnInit {
        private email = "";
        private password = "";
        private confirmPassword = "";
        private firstName = "";
        private lastName = "";
        public result;
    

    constructor(private routerExtensions: RouterExtensions, private firebaseService:FirebaseService) {
        //this.user = new User();
    }

    ngOnInit() { }


    submit() {

      console.log("Register:: submit()");
      console.log("Email: " + this.email);
      console.log("Password: " + this.password);
      console.log("ConfirmPassword: " + this.confirmPassword);

      if(this.password != this.confirmPassword)
      {
          alert("Your passwords did not match");
      }
      else
      {
          this.register();
      }
    }

    register()
    {
        this.setUserInfo();

        this.firebaseService.register(User)
        .then((message) => {
            if(message != null)
            {
                userCollection.doc(User.getEmail().toLowerCase()).set({
                    email: User.getEmail(),
                    firstName: User.getFirstName(),
                    lastName: User.getLastName()
                })
                .then(()=> {
                    console.log(this.email + " added to user database");
                })

                // List of basic activities
                const basics = ['Walking', 'Reading', 'Capturing Scenery', 'Movie Watching'];

                // Find data of each activity
                (async () =>{                    
                    let basicsData = [];

                    let walking = await activityCollection.doc(basics[0]).get()
                    basicsData.push(walking.data())

                    let reading = await activityCollection.doc(basics[1]).get()
                    basicsData.push(reading.data())

                    let scenery = await activityCollection.doc(basics[2]).get()
                    basicsData.push(scenery.data())

                    let movies = await activityCollection.doc(basics[3]).get()
                    basicsData.push(movies.data())

                    return basicsData;

                })()
                .then(basicsData => {
                    userCollection.doc(User.getEmail()).collection("activity_feedback").add({
                        activity: "Walking",
                        searchTerm: "trails",
                        feedback: basicsData[0].feedback,
                        frequency: 1,
                        timestamp: firebase.firestore().FieldValue().serverTimestamp()
                    })
    
                    userCollection.doc(User.getEmail()).collection("activity_feedback").add({
                        activity: "Reading",
                        searchTerm: "libraries",
                        feedback: basicsData[1].feedback,
                        frequency: 1,
                        timestamp: firebase.firestore().FieldValue().serverTimestamp()
                    })
    
                    userCollection.doc(User.getEmail()).collection("activity_feedback").add({
                        activity: "Capturing Scenery",
                        searchTerm: "scenic spots",
                        feedback: basicsData[2].feedback,
                        frequency: 1,
                        timestamp: firebase.firestore().FieldValue().serverTimestamp()
                    })

                    userCollection.doc(User.getEmail()).collection("activity_feedback").add({
                        activity: "Movie Watching",
                        searchTerm: "theaters",
                        feedback: basicsData[3].feedback,
                        frequency: 1,
                        timestamp: firebase.firestore().FieldValue().serverTimestamp()
                    })
    
                    this.routerExtensions.navigate(['/login']);

                })
                .catch(error => console.log('Account creation error, unable to find basic activities: ', error))
            }
        })
        .catch(error => {
            alert("Account creation failed, type in valid info!");
        }
        );
        
    }

    setUserInfo()
    {
        User.setEmail(this.email);
        User.setPassword(this.password);
        User.setFirstName(this.firstName);
        User.setLastName(this.lastName);
    }
}
