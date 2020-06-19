import { Component, OnInit } from '@angular/core';

@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})

export class LoginComponent implements OnInit {
    public isLoading: boolean = false
    public isLoggingIn = true;
    constructor() { }

    ngOnInit() { }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }
    submit() {
        if (this.isLoggingIn) {
            this.isLoading = true;
            console.log("Log in is tapped")
        } else {
            // Perform the registration
        }
    }
}
