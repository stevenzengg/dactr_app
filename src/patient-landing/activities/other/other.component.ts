import { Component, OnInit } from '@angular/core';
import{ getPlacesService } from "../../../services/getPlacesAPI.service"
import{ getLocationService } from "../../../services/getLocation.service"

@Component({
    selector: 'other-component',
    providers: [getPlacesService, getLocationService]
    templateUrl: 'other.component.html'
})

export class NameComponent implements OnInit {
    constructor(
        private places: getPlacesService, 
        private loc: getLocationService) { 

    }

    private getSearch(keyword) {
        this.loc.getLocation().then(location => {
            this.places.getPlacesFunct(location[0], location[1], keyword).then(results => {
            

            }).catch(e => console.log(e))
        }).catch(e => console.log())
        

    }

    ngOnInit() { }
}