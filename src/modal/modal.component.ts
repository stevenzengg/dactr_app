import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "modal",
    template: `
    <StackLayout class="dialog">
    <Label textWrap="true" text="Exercise Options" color = "gray"></Label>
    <Button class="btn" text="Outdoor Activities"></Button>
    <Button class="btn" text="Local Classes"></Button>
    <Button class="btn" text="App Connects"></Button>
    <Button class="btn" text="Cancel" (tap)="close()"></Button>
  </StackLayout>
	`
})
export class ModalComponent implements OnInit {

    constructor(private params: ModalDialogParams) {}

    ngOnInit() {}

    close() {
        this.params.closeCallback();
    }
}