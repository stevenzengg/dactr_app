import { Component, NgZone } from "@angular/core";
import * as Geolocation from "nativescript-geolocation";
import { Injectable } from '@angular/core';

@Injectable()
export class getLocationService {

    private latitude: number;
    private longitude: number;
    //private watchId: number;

    constructor() {
        this.latitude = 0;
        this.longitude = 0;
    }
    
    /*
    public getLatLot(): any {
        this.updateLocation()
        .then(()=>{
            console.log('getLatLot -> ', [this.latitude, this.longitude])
            return [this.latitude, this.longitude]
        })
        .catch(error => {            
            console.log(error)
            return [40.798214, -77.859909]
        })
        
    }

    
    private async updateLocation() {
        let location = await this.getDeviceLocation()
        console.log('getLatLot -> ', [this.latitude, this.longitude])

        this.latitude = location.latitude;
        this.longitude = location.longitude;
    }    
    
    private getDeviceLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            Geolocation.enableLocationRequest().then(() => {
                Geolocation.getCurrentLocation({timeout: 10000}).then(location => {
                    resolve(location);
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }
    

    /*
    public startWatchingLocation() {
        this.watchId = Geolocation.watchLocation(location => {
            if(location) {
                this.zone.run(() => {
                    this.latitude = location.latitude;
                    this.longitude = location.longitude;
                });
            }
        }, error => {
            console.log(error);
        }, { updateDistance: 1, minimumUpdateTime: 1000 });
    }

    public stopWatchingLocation() {
        if(this.watchId) {
            Geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }
    */

}