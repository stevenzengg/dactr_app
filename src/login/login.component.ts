import { Component, OnInit } from '@angular/core';

import {RouterExtensions} from '@nativescript/angular/router';


@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})


export class LoginComponent implements OnInit {
    public isLoading: boolean = false;
    public isLoggingIn = true;
    public username = "";
    public password = "";
    public confirmPassword = "";
    public gLogin: boolean;

    constructor(private routerExtensions: RouterExtensions) { 

    }

    ngOnInit() { }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }


    submit() {
        if (this.isLoggingIn) {
            this.isLoading = true;
            console.log(this.username);
            console.log(this.password);

            this.routerExtensions.navigate(['/patient-landing']);
        } else {
            // Perform the registration
            if(this.password != this.confirmPassword)
        {
            console.log("Your passwords did not match");
        }
        else
        {
            console.log("Account created");
        }
        }
    }
}
