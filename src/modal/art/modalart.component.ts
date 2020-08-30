import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { RouterExtensions } from '@nativescript/angular/router';


@Component({
    selector: "modalart",
    template: `
		<StackLayout class="p-20">
            <Label class="h2 text-center" text="Art Options" textWrap="true"></Label>
            <Button class="btn btn-outline" text="Art" (tap)="toArt()"></Button>
            <Button class="btn btn-outline" text="Close" (tap)="close()"></Button>

        </StackLayout>
	`
})
export class ModalArtComponent implements OnInit {

    constructor(private params: ModalDialogParams, private routerExtensions: RouterExtensions) {}

    ngOnInit() {}

    close() {
        this.params.closeCallback();
    }
    toArt(){
        this.routerExtensions.navigate(['arcomponent']);
    }
}