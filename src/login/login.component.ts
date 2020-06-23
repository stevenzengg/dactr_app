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
    public username = "";
    public password = "";

    constructor() { 
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
        } else {
            // Perform the registration
        }
    }
}
