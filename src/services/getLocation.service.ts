import * as Geolocation from "nativescript-geolocation";
import { Injectable } from '@angular/core';
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get

@Injectable()
export class getLocationService {

    constructor() { }


    async getLocation(){

        let location: any[]
        let pennState = [40.798214, -77.859909]

        // Enable location request and obtain location
        await Geolocation.enableLocationRequest();
        if(Geolocation.isEnabled){
            let currentLocation = await Geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 });            
            location = [currentLocation.latitude, currentLocation.longitude]
            console.log('OBTAINED LOCATION')
        }
        else{
            console.log('LOCATION NOT ENABLED')
            location = pennState.slice() // Set to State College
        }

        // If location is returned [0,0], provide State College coordinates
        if(location[0] == 0 && location[1] == 0){
            console.log("LOCATION RETURNED [0,0]")
            location = pennState.slice()
        }

        return location

    }
}