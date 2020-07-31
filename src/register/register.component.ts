//need to check password confirmation
import { Component, OnInit } from '@angular/core';

import { User } from "../models/user.model";
import  { FirebaseService } from "../services/firebase.service";

import {RouterExtensions} from '@nativescript/angular/router';
import { registerElement } from '@nativescript/angular';


@Component({
    selector: "register",
    moduleId: module.id,
    templateUrl: "register.component.html",
    styleUrls: ["register.component.css"]
})


export class RegisterComponent implements OnInit {
    public email = ""
    public password = ""
    public confirmPassword = ""
    public result;
    public user:User;

    constructor(private routerExtensions: RouterExtensions, private firebaseService:FirebaseService) {
        this.user = new User();
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
        this.user.email = this.email;
        this.user.password = this.password;

        this.firebaseService.register(this.user)
        .then(() => {
            this.routerExtensions.navigate(['/login']);
        })
        .catch(error => {
            alert("Account creation failed, type in valid info!");
        }
        );
        
    }
}
