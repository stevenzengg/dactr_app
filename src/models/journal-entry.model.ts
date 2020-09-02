export class JournalEntry {
    public journal:string;
    private date;

    public getJournal()
    {
        return this.journal;
    }

    public getDate()
    {
        return this.date;
    }

    public setJournal(journal)
    {
        this.journal = journal;
    }

    public setDate(date)
    {
        this.date = date;
    }
}