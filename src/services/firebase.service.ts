import { Injectable } from '@angular/core';

import * as firebase from "nativescript-plugin-firebase";

import {User} from "../models/user.model";

import {BackendService} from "./backend.service";

@Injectable()
export class FirebaseService {
    constructor() { }
    
    login(user: User) {
        return firebase.login({
          type: firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: user.email,
            password: user.password
          }
        }).then((result: any) => {
              BackendService.token = result.uid;
              return JSON.stringify(result);
          }, (errorMessage: any) => {
            alert(errorMessage);
          });
      }

      logout(){
        BackendService.token = "";
        firebase.logout();    
      }

}