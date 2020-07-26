import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { RouterExtensions} from '@nativescript/angular/router';

@Component({
    selector: 'patient-landing',
    moduleId: module.id,
    templateUrl: './patient-landing.component.html',
    styleUrls: ["./patient-landing.component.css"]
})

export class PatientLandingComponent implements OnInit {
    constructor(private firebaseService: FirebaseService, private routerExtensions: RouterExtensions) { }

    ngOnInit() { }

    logout() {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true } );
      }
}
