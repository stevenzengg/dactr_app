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
    toRegister()
    {
      this.routerExtensions.navigate(['/register']);
    }

    toClincianLogin()
    {
        this.routerExtensions.navigate(['/clinician-login']);
    }


    ngOnInit() { }
}
