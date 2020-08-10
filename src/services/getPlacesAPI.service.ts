import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Service will execute http GET request to access Cloud Function "getPlacesFunct" and return results
@Injectable()
export class getPlacesService {

    private url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?AIzaSyCdu52mSKeOKY9AYWyak1yLjhge2zfNAvI";

    constructor(private http: HttpClient){}

    getPlacesFunct(location, keyword){
        console.log('getPlaces says hi')
        return this.http.get(this.url + "&" + location + "&"+ "50000" + "&" + keyword);
    }
    


}