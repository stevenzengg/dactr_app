import { Component, OnInit } from '@angular/core';
import {Page} from '@nativescript/core/ui/page';
import {RouterExtensions} from '@nativescript/angular/router';

import { User } from "../models/user.model";
import  { FirebaseService } from "../services/firebase.service";

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
    public confirmPassword = "";

    public user: User;
    public number;

    constructor(private routerExtensions: RouterExtensions, private page : Page,
        private firebaseService: FirebaseService) {
            this.user = new User();

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
        this.routerExtensions.navigate(['/patient-landing']);
        return;
        this.isLoading = true;
        console.log(this.username);
        console.log(this.password);

        this.user.email = this.username;
        this.user.password = this.password;

        this.firebaseService.login(this.user)
        .then((message)=> {
            this.isAuthenticating = false;
            if(message != null)
            {
                this.routerExtensions.navigate(['/patient-landing']);
            }
        }
        )
        .catch(error => {
            this.isAuthenticating = false;
            console.log("ERROR LOGGING IN");
        })

        this.routerExtensions.navigate(['/login']);


    }

}
