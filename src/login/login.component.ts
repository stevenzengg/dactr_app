import { Component, OnInit } from '@angular/core';
import {Page} from '@nativescript/core/ui/page';
import {RouterExtensions} from '@nativescript/angular/router';

import { User } from "../models/user.model";
import  { FirebaseService } from "../services/firebase.service";


const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");

import * as appSettings from "tns-core-modules/application-settings";

import * as viewModule from "@nativescript/core/ui/core/view";
import { EmailValidator } from '@angular/forms';



@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})



export class LoginComponent implements OnInit {
    public isLoading: boolean = false;
    public isLoggingIn = true;
    public isAuthenticating = false;
    public username = "";
    public password = "";
    public firstName = "";
    public lastName = "";
    public confirmPassword = "";

    public number;

    constructor(private routerExtensions: RouterExtensions, private page : Page,
        private firebaseService: FirebaseService) {

    }


    ngOnInit() {
    this.page.backgroundImage = "~/login/landscapebackground.jpg";
    }
    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }


    submit()
    {
        this.isAuthenticating = true;

        if(this.isLoggingIn) {
            this.login();
        }

    }

    login() {
        //Clears app settings
        appSettings.remove("email");
        appSettings.remove("firstName");
        appSettings.clear();

        this.isLoading = true;
        console.log(this.username);
        console.log(this.password);

        //Set's current user's email and password
        User.setEmail(this.username);
        User.setPassword(this.password);

        this.firebaseService.login(User)
        .then((message)=> {
            this.isAuthenticating = false;
            
            if(message != null)
            {
                userCollection.doc(this.username.toLowerCase()).get()
                .then((doc) => {

                    //If user document doesn't exists in database
                    if(!doc.exists) {
                        console.log("Document doesn't exist");
                    }
                    //If user document does exist in database
                    else {
                       console.log("Document data: ", doc.data());
                       console.log(doc.data().firstName);

                        //Sets first name and last name
                        User.setFirstName(doc.data().firstName);
                        User.setLastName(doc.data().lastName);

                        
                        //Sets application settings so we can access these values
                        //in other components
                        appSettings.setString("email", User.getEmail().toLowerCase());
                        appSettings.setString("firstName", User.getFirstName());
                        appSettings.setString("lastName", User.getLastName());
                        
                        console.log("Login Email: ", appSettings.getString("email"));
                        console.log("Login First Name: ", appSettings.getString("firstName"));

                        this.routerExtensions.navigate(['/patient-landing']);
                    }

                })
                .catch(error => {
                    console.log("Error getting doc");
                })

                
            }
        }
        )
        .catch(error => {
            this.isAuthenticating = false;
            console.log("ERROR LOGGING IN");
            this.routerExtensions.navigate(['/login']);
        })



    }

}

