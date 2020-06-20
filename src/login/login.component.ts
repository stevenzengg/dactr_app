import { Component, OnInit } from '@angular/core';

@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})

export class LoginComponent implements OnInit {
    public isLoading: boolean = false;
    constructor() { }

    ngOnInit() { }

    login()
    {
        this.isLoading = true;
        console.log("Log in is tapped")
    }
}
