import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Service will execute http GET request to access Cloud Function "getSentiment" and return results
@Injectable()
export class getSentimentService {

    private url = "https://us-central1-dactr-app-20200711.cloudfunctions.net/getSentiment?text=";

    constructor(private http: HttpClient){}

    /*
     Provides sentiment results based on inputted sentence in JSON format
     ex. {sentence: '', 
          sentiment: {
                score: 0.0
                magnitude: 0.0
            }
        }
    */
    getSentiment(sentence: string){
        console.log('getSentiment says hi')
        return this.http.get(this.url + sentence);
    }

}