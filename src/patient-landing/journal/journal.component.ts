import { Component, OnInit } from '@angular/core';
import { EnvironmentManagerService } from '../../services/environment-manager.service';
import { SentimentService } from '../../services/sentiment.service'



@Component({
    selector: 'journal',
    providers: [EnvironmentManagerService, SentimentService],
    templateUrl: 'journal.component.html'    
})


// We would import apis for Natural Language (Sentiment and Syntax) as well Places
// We would need to access Firebase Fire DataStore as well
export class JournalComponent implements OnInit {
    public journal;
    private document;
    private environment;
    private sentimentAnalysis;
    
    
    constructor(private envService: EnvironmentManagerService,
        private senService: SentimentService) {
        this.environment = new EnvironmentManagerService();
        this.sentimentAnalysis = new SentimentService(); 
     }

     
    printJournal()
    {
        console.log(this.journal);
        
        this.document = {
            content: this.journal,
            type: 1       // PLAIN_TEXT
        };

        //this.sentimentAnalysis(this.document);
    }

    // Imports the Google Cloud client library
    async quickstart() {
        const language = require('@google-cloud/language');
        const client = new language.LanguageServiceClient({projectId: "dactr-app-20200711", keyFilename: 'C:/Users/divye/Downloads/dactr-app-20200711-4297127355a7.json'}); //{projectId: "dactr-app-20200711", keyFilename: this.environment.getGoogleNLPKey()}
    }
    

    ngOnInit() { }
}
