import { Component, OnInit } from '@angular/core';
import { EnvironmentManagerService } from '../../services/environment-manager.service';
import { SentimentService } from '../../services/sentiment.service'

// Imports the Google Cloud client library
//const language = require('@google-cloud/language');

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
    

    ngOnInit() { }
}
