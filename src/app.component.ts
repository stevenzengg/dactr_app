import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    //templateUrl: "./app.component.html"
    //templateUrl: "./login/login.component.html"
    template: `
        <StackLayout>
            <login></login>
        </StackLayout>
    `
    
})
export class AppComponent { }
