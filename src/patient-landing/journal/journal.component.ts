import { Component, OnInit } from '@angular/core';
import { getFile, getImage, getJSON, request, HttpResponse } from "tns-core-modules/http";

import {
    getString,
    setString,
  } from "tns-core-modules/application-settings";

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));

@Component({
    selector: 'journal',
    templateUrl: 'journal.component.html'    
})


// We would import apis for Natural Language (Sentiment and Syntax) as well Places
// We would need to access Firebase Fire DataStore as well
export class JournalComponent implements OnInit {
    public journal  = "";  
    
    constructor(){}

    // Master function for all processes
    submitJournal(){

        console.log(this.journal);

        //Comment code underneath to stop writing into database
        user.collection("journal_entry").add({
            journal: this.journal
        });

        // ACTIVITY RECOMMENDER
        
        // Find positive sentences
        const pos_sentences = this.analyzeSentiment();
        // Obtain nouns and verbs as a JSON
        const nouns_verbs = this.nouns_verbs(pos_sentences);
    }
    
    /**
     * Analyzing Sentiment in a String

        Analyzes sentiment of each sentence in journal, returns list with all positively scored sentences

        Args: journal input

        Returns: list of all positively scored sentences in journal entry
     */
    analyzeSentiment()
    {
        // List of positive sentences
        const pos_sentence_list = [];

        // Break journal into sentences
        const sentences = this.journal.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g);

        for (const sentence of sentences){
            // Obtain sentiment score
            // If greater than 0, append to pos_sentence_list
            
            //{sentence: "skfjhbnsfhskbsjk", sentiment:{magnitude: .222, score: .3231232}}
            request({
                url: "https://us-central1-dactr-app-20200711.cloudfunctions.net/getSentiment",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    text: sentence
                })
            }).then((response) => {
                const result = response.content.toJSON();
                
                if (result.sentiment.score > 0) {
                    pos_sentence_list.push(result.sentence)
                }

            }, (e) => {
            });
        }

        return pos_sentence_list;      
    }

    /**
     *  Obtains nouns and verbs of entered list of positive sentences

        Args: positive sentence list

        Returns: dictionary with nouns and verbs of sentences
     */
        nouns_verbs(pos_sentence_list){

            const nouns_verbs = {
                nouns: [],
                verbs: [],
            };

            for (const sentence of pos_sentence_list)  {

                request({
                    url: "https://us-central1-dactr-app-20200711.cloudfunctions.net/getNounsandVerbs",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    content: JSON.stringify({
                        text: sentence
                    })
                }).then((response) => {
                    // result is a json of {nouns: [], verbs: []}
                    const result = response.content.toJSON();

                        for (const noun of result.nouns) {
                            nouns_verbs.nouns.push(noun)
                        }

                        for (const verb of result.verbs) {
                            nouns_verbs.verbs.push(verb)
                        }


                }, (e) => {
                });
            }
        
        return nouns_verbs

    }

    ngOnInit() { }
}
