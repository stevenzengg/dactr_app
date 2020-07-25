//need to check password confirmation
import { Component, OnInit } from '@angular/core';

import {RouterExtensions} from '@nativescript/angular/router';


@Component({
    selector: "register",
    moduleId: module.id,
    templateUrl: "register.component.html",
    styleUrls: ["register.component.css"]
})


export class RegisterComponent implements OnInit {
    public password = ""
    public confirmPassword = ""
    constructor(private routerExtensions: RouterExtensions) {

    }

    ngOnInit() { }


    submit() {

      if(this.password != this.confirmPassword)
      {
          console.log("Your passwords did not match");
      }
      else
      {
          console.log("Account created");
          this.routerExtensions.navigate(['/patient-landing']);
      }
    }
}
