import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";

// Service will execute http GET request to access Cloud Function "getNounsandVerbs" and return results
@Injectable()
export class getNounsVerbsService {

    constructor(){}

    // Provides nouns of a given sentence as a list
    getNouns(sentence: string){
        let nouns = null;
        request({
            url: "https://us-central1-dactr-app-20200711.cloudfunctions.net/getNounsandVerbs?text=" + sentence,
            method: "GET"
        }).then((response) => {
            // result is a json of {nouns: [], verbs: []}
            const result = response.content.toJSON();
                           
            nouns = result.nouns;
            return nouns;

        }, (e) => {
            console.log(e);
        });

        return nouns;
    }

    // Provides verbs of a given sentence as a list
    getVerbs(sentence: string){
        let verbs = null;
        request({
            url: "https://us-central1-dactr-app-20200711.cloudfunctions.net/getNounsandVerbs?text=" + sentence,
            method: "GET"
        }).then((response) => {
            // result is a json of {nouns: [], verbs: []}
            const result = response.content.toJSON();
                           
            verbs = result.verbs;
            return verbs;

        }, (e) => {
            console.log(e);
        });

        return verbs;
    }

}