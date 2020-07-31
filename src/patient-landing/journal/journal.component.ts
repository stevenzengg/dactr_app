import { Component, OnInit } from '@angular/core';

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

@Component({
    selector: 'journal',
    templateUrl: 'journal.component.html'
})


// We would import apis for Natural Language (Sentiment and Syntax) as well Places
// We would need to access Firebase Fire DataStore as well
export class JournalComponent implements OnInit {
    public journal;
    

    constructor() { }

    async printJournal()
    {
        console.log(this.journal);       
      
        // Instantiates a client
        const client = new language.LanguageServiceClient();
      
        // The text to analyze
        const text = 'Hello, world!';
      
        const document = {
          content: text,
          type: 'PLAIN_TEXT',
        };
      
        // Detects the sentiment of the text
        const [result] = await client.analyzeSentiment({document: document});
        const sentiment = result.documentSentiment;
      
        console.log(`Text: ${text}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    }

    ngOnInit() { }
}
