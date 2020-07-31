import { Injectable } from '@angular/core';

import * as firebase from "nativescript-plugin-firebase";

import {User} from "../models/user.model";

import {BackendService} from "./backend.service";

@Injectable()
export class FirebaseService {
    constructor() { }
    
    register(user: User) {
      return firebase.createUser({
        email: user.email,
        password: user.password
      }).then(
            function (result:any) {
              Promise.resolve('Passed');
              return JSON.stringify(result);
            },
            function (errorMessage:any) {
              alert(errorMessage);
              Promise.reject('Failed');
            }
        )
    }

    login(user: User) {
        return firebase.login({
          type: firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: user.email,
            password: user.password
          }
        }).then((result: any) => {
              Promise.resolve('Passed');
              BackendService.token = result.uid;
              return JSON.stringify(result);
          }, (errorMessage: any) => {
            Promise.reject('Failed');
            alert(errorMessage);
          });
      }

      logout(){
        BackendService.token = "";
        firebase.logout();    
      }

}