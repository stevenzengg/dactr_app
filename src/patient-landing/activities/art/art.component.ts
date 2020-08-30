import { Component, OnInit } from '@angular/core';
import{ getPlacesService } from "../../../services/getPlacesAPI.service"
import{ getLocationService } from "../../../services/getLocation.service"
import {Position, Marker, MapView} from "nativescript-google-maps-sdk";
import {RouterExtensions} from '@nativescript/angular/router';
import * as utils from "tns-core-modules/utils/utils";

const mapsModule = require("nativescript-google-maps-sdk");

//These two lines initialize Google Maps Map View
import {registerElement} from "@nativescript/angular/element-registry";
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: 'art',
    providers: [getPlacesService, getLocationService],
    templateUrl: 'art.component.html'
})

export class ArtComponent implements OnInit {
    public placeName = []
    public searchTerm = "";
    public valid = false;
    private mapView: MapView;
    private userLat = "40.798214"
    private userLng = "-77.859909"
    private zoom = 10;

    constructor(
        private places: getPlacesService, 
        private loc: getLocationService) { 

    }

    private async getSearch(keyword) {
        this.searchTerm = keyword;
        
        // obtain location
        const location = await this.loc.getLocation()

        if(location[0] == 0){
            this.userLat = "40.798214"
            this.userLng = "-77.859909"
        } else {
            this.userLat = location[0];
            this.userLng = location[1];
        }
        console.log('LOCATION IN GETSEARCH: ', this.userLat, ' ', this.userLng);

        let mapsResults: any;

        // obtain places results
        const results = await this.places.getPlacesFunct(this.userLat, this.userLng, keyword)

        console.log('RESULTS: ', results)
        mapsResults = results;

        for(var i = 0; i < mapsResults.results.length; i++) {
            this.placeName.push(mapsResults.results[i])
        }
        console.log('PLACES: ', this.placeName)

        Promise.resolve();
    }    

    private onMapReady(args): void {
        this.mapView = args.object;

        this.addMarker();
    }

    private addMarker(): void {
        /* console.log("Setting a marker...");
         var marker = new Marker();
         marker.position = Position.positionFromLatLng(-33.86, 151.20);
         marker.title = "Sydney";
         marker.snippet = "Australia";
         marker.userData = { index : 1};
         this.mapView.addMarker(marker);
         */
        
        this.getSearch('arts and crafts').then(() => {
            this.valid = true;
            //Loops through all the places and creates a marker for them
            for(var i = 0; i < this.placeName.length; i++)
            {
                var marker = new Marker();
                marker.position = Position.positionFromLatLng(this.placeName[i].geometry.location.lat, this.placeName[i].geometry.location.lng);    
                marker.title = this.placeName[i].name;
                marker.snippet = this.searchTerm;
                marker.userData = {index: 1};

                console.log('MARKER: ', marker.title)
    
                this.mapView.addMarker(marker);
            }
    
            console.log("Feedback Component: markerAdder(): Markers are all added"); 
        })
        .catch(err => {
            console.log('ERROR WITH getSearch: ', err);
        })
    }



    ngOnInit() { }
    sketchTutorials(){
        utils.openUrl("https://www.youtube.com/watch?v=ewMksAbgdBI")
    }
    sketchIdeas(){
        utils.openUrl("https://www.youtube.com/watch?v=sbdCXQEV9UA")
    }
    canvasTutorials(){
        utils.openUrl("https://www.youtube.com/watch?v=rpnHic9NfXA")
    }
    canvasIdeas(){
        utils.openUrl("https://www.youtube.com/watch?v=M6ZlcscNVhY")
    }
    acrylicTutorials(){
        utils.openUrl("https://www.youtube.com/watch?v=rpnHic9NfXA")
    }
    acrylicIdeas(){
        utils.openUrl("https://www.youtube.com/watch?v=M6ZlcscNVhY")
    }
    waterTutorials(){
        utils.openUrl("https://www.youtube.com/watch?v=1Fgkwcym4j4")
    }
    waterIdeas(){
        utils.openUrl("https://www.youtube.com/watch?v=3kojEoKgrTY")
    }
}