import { Component, OnInit } from '@angular/core';

import {RouterExtensions} from '@nativescript/angular/router';

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent implements OnInit {
    constructor(private routerExtensions: RouterExtensions) { }

    toLogin()
    {
        this.routerExtensions.navigate(['/login']);
    }

    ngOnInit() { }
}