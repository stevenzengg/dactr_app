//need to check password confirmation
import { Component, OnInit } from '@angular/core';

import { User } from "../models/user.model";
import  { FirebaseService } from "../services/firebase.service";

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");

import {RouterExtensions} from '@nativescript/angular/router';
import { registerElement } from '@nativescript/angular';


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

                userCollection.doc(User.getEmail()).collection("activity_feedback").add({
                    activity: "Walking",
                    searchTerm: "trails",
                    frequency: 1,
                    timestamp: firebase.firestore().FieldValue().serverTimestamp()
                })

                userCollection.doc(User.getEmail()).collection("activity_feature").add({
                    activity: "Reading",
                    searchTerm: "libraries",
                    frequency: 1,
                    timestamp: firebase.firestore().FieldValue().serverTimestamp()
                })

                userCollection.doc(User.getEmail()).collection("activity_feature").add({
                    activity: "Capturing Scenery",
                    searchTerm: "scenic spots",
                    frequency: 1,
                    timestamp: firebase.firestore().FieldValue().serverTimestamp()
                })

                this.routerExtensions.navigate(['/login']);
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
