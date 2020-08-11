import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Service will execute http GET request to access Cloud Function "getNounsandVerbs" and return results
@Injectable()
export class getNounsVerbsService {

    private url = "https://us-central1-dactr-app-20200711.cloudfunctions.net/getNounsandVerbs?text=";

    constructor(private http: HttpClient){}

    /*
     Provides list of nouns and verbs based on inputted sentence in JSON format
     ex. {nouns: [], verbs: []}
    */
    getNounsVerbs(sentence: string){
        console.log('getNounsVerbs says hi')
        return this.http.get(this.url + sentence);
    }

}