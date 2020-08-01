import { Component, OnInit } from '@angular/core';
import { EnvironmentManagerService } from '../../services/environment-manager.service';

import * as language from '@google-cloud/language';
// Imports the Google Cloud client library
//const language = require('@google-cloud/language');

@Component({
    selector: 'journal',
    providers: [EnvironmentManagerService],
    templateUrl: 'journal.component.html'
})


// We would import apis for Natural Language (Sentiment and Syntax) as well Places
// We would need to access Firebase Fire DataStore as well
export class JournalComponent implements OnInit {
    public journal;
    private environment;
    

    constructor(private envService: EnvironmentManagerService) {
        this.environment = new EnvironmentManagerService();
     }

     
    async printJournal()
    {
        console.log(this.journal);       
      
        // Instantiates a client
        var client = new language.LanguageServiceClient({projectId: "dactr-app-20200711", keyFilename: this.environment.getGoogleNLPKey()});
      
        // The text to analyze
        var text = 'Hello, world!';
      
        var document = {
          content: text,
          type: 1
        };
      
        // Detects the sentiment of the text
        var [result] = await client.analyzeSentiment({document: document});
        var sentiment = result.documentSentiment;
      
        console.log(`Text: ${text}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    }
    

    ngOnInit() { }
}
