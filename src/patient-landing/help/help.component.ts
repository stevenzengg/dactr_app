import { Component, OnInit } from '@angular/core';
import * as utils from "tns-core-modules/utils/utils";

@Component({
    selector: 'help',    
    templateUrl: 'help.component.html',
    styleUrls: ['help.component.css']
})

export class HelpComponent implements OnInit {    
    
    journalingText1="By clicking on 'Enter Journals Here' you will be able to enter journal entries whenever you want. All journals will have three prompts focused on your mood, the causes of your mood, and future actions to take because of it, providing you a chance to reflect on your experiences."
    journalingText2="After submitting, as per behavioral activation, 2 of the most recently added recommended activities and 2 of the most frequently recommended activities will appear along with places near you that have such activities."
    journalingText3="With this information, you can begin to see ways you can remain active, maintain a positive mindset, and achieve your goals."

    journalLogText1="In the Journal Log, you can view your previous questions and journal entries."

    activitiesText1="The Activities tab provides you with recommended activities for anyone and ways/places to perform them, along with your previously recommended activities."
    activitiesText2="Recommended activities will show your most frequently recommended activities first. If you try an activity and decide you do not like it, you can remove it from your recommended."
    
    emergencyText1="The Emergency tab has resources for any time you feel you need immediate support."
    emergencyText2="We understand that some days, reflection just isn't enough. In these scenarios, please feel free to contact the hotlines linked."
    
    accountText1="In the Account tab, you can view your user information and logout of the app."

    constructor() { }

    ngOnInit() { }

    openDactrWeb(){
        utils.openUrl('https://dactrgroup.com/')
    }
}