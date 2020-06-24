//Steven: use line 7 template
//Yajur: use line 10 template

import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    //templateUrl: "./app.component.html"
    //templateUrl: "./login/login.component.html"
    template: `
        <page-router-outlet></page-router-outlet>
    `
})
export class AppComponent { }
