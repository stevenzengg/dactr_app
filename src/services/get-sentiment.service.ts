import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";

// Service will execute http GET request to access Cloud Function "getSentiment" and return results
@Injectable()
export class getSentimentService {

    private storage = null;

    constructor(){}

    // Provides sentiment score based on inputted sentence
    getSentimentScore(sentence: string){
        request({
            url: ("https://us-central1-dactr-app-20200711.cloudfunctions.net/getSentiment?text=" + sentence),
            method: "GET"
        }).then((response) => {
            const result = response.content.toJSON();
            console.log("SCORE IN SERVICE: ", result.sentiment.score);

            return result.sentiment.score;
                                    
        }, (e) => {
            console.log(e);            
        }).catch(error =>{
            console.log(error)
        });
    }

    // Provides sentiment magnitude based on inputted sentence
    getSentimentMagnitude(sentence: string){
        let magnitude = null;
        request({
            url: ("https://us-central1-dactr-app-20200711.cloudfunctions.net/getSentiment?text=" + sentence),
            method: "GET"
        }).then((response) => {
            const result = response.content.toJSON();

            magnitude = result.sentiment.magnitude;
            return magnitude;
                                    
        }, (e) => {
            console.log(e);
        });

        return magnitude;
    }

    private setStorage(statement){
        this.storage = statement;
    }

    private getStorage(){
        return this.storage;
    }

}