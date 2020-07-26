import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'journal',
    templateUrl: 'journal.component.html'
})


// We n
export class JournalComponent implements OnInit {
    public journal;

    constructor() { }

    printJournal()
    {
        console.log(this.journal);
    }

    ngOnInit() { }
}
