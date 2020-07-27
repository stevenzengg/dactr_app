import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'journal',
    templateUrl: 'journal.component.html'
})


// We would import apis for Natural Language (Sentiment and Syntax) as well Places
// We would need to access Firebase Fire DataStore as well
export class JournalComponent implements OnInit {
    public journal;

    constructor() { }

    printJournal()
    {
        console.log(this.journal);
    }

    ngOnInit() { }
}
