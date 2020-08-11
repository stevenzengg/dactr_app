import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "modalsuggestion",
    template: `
		<StackLayout class="p-20">
        <Label fontSize = "40" text = {{mapsResult.activity_0}}></Label>
            <Button class="btn btn-outline" text="Close Modal" (tap)="close()"></Button>
        </StackLayout>
	`
})
export class ModalSuggestionComponent implements OnInit {

    constructor(private params: ModalDialogParams) {}

    ngOnInit() {}

    close() {
        this.params.closeCallback();
    }
}