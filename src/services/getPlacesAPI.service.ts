import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Service will execute http GET request to access Places API Nearby Search and return results
@Injectable()
export class getPlacesService {

    private url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    constructor(private http: HttpClient){}

    
    // Get request with exponential backoff
    async getPlacesFunct(lat, lon, keyword){

        const max_delay = 7000
        let current_delay = 100
        
        while(true){
            // Make places get request
            console.log('getPlaces says hi')
            let call = this.http.get(`${this.url}location=${lat},${lon}&radius=25000&keyword=${keyword}&key=AIzaSyCdu52mSKeOKY9AYWyak1yLjhge2zfNAvI`);

            // Call request
            let result = await call.toPromise();

            // If result exists, return it
            // Otherwise retry request
            if(result){
                return result
            } else {
                current_delay *= 2                
            }

            if(current_delay > max_delay){
                throw new Error("Too many retry attempts on Google Places http request")
            }

            // Wait till next request
            console.log('RETRYING PLACES API CALL');
            await this.sleep(current_delay)            
        }
    }

    // Timeout function
    private sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    


}