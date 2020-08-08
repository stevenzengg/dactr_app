import { Component, OnInit } from '@angular/core';
import {RouterExtensions} from '@nativescript/angular/router';

@Component({
    selector: 'clinician-login',
    templateUrl: 'clinician-login.component.html'
})

export class ClinicianLoginComponent implements OnInit {
    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit() { }

    toClinicianLanding()
    {
        this.routerExtensions.navigate(['/clinician-landing']);
    }
}