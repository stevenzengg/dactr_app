
import { Injectable } from '@angular/core';
import * as language from '@google-cloud/language';

@Injectable()
export class SentimentService {
    /*
    // Inputs: type Document
    // Returns: sentiment score of entered document    
    async getSentiment(document)
    {
        
        // Instantiates a client
        var client = new language.LanguageServiceClient({projectId: "dactr-app-20200711", keyFilename: 'C:\Users\divye\Downloads\dactr-app-20200711-4297127355a7.json'}); //{projectId: "dactr-app-20200711", keyFilename: this.environment.getGoogleNLPKey()}
      
        // The text to analyze
        //var text = 'Hello, world!';
        
        // Detects the sentiment of the text
        var [result] = await client.analyzeSentiment({document: document});
        var sentiment = result.documentSentiment;
      
        console.log(`Text: ${document.content}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

        // (return the sentiment score)
        
        
    }
*/
}
