import { getString, setString, } from "tns-core-modules/application-settings";
import { async } from "rxjs/internal/scheduler/async";


const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({});

const userCollection = firebase.firestore().collection("user_database");
const user = userCollection.doc(getString("email"));

async() => {
    const journal_entries = user.collection("journal_entry");

    let doc = await journal_entries.orderBy('timestamp', 'desc').limit(1)

    console.log('findLatestJournal -> ', doc.journal)

}