import { Component, effect, inject, Injector, linkedSignal, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-step1',
    imports: [CommonModule, FormsModule, MatButton, MatSlideToggle],
    templateUrl: './step1.component.html',
    styleUrl: './step1.component.css',
})
export class Step1Component {
    injector = inject(Injector); // Needed for lazy httpResource
    id = model<undefined | number>(undefined);
    eagerResource = httpResource(() =>
        this.id()
            ? `https://jsonplaceholder.typicode.com/todos/${this.id()}`
            : undefined
    );
    lazyResource: HttpResourceRef<any> | undefined;


    // So this is not using a linkedSignal - but it checks this.id() - if empty then it will return undefined for the URL - which doesn't make te request.
    // Nice! But not really as now the previous result dissappears on the resource, removing the first result from html..? I don't understand why it works like that.
    // When not simply have it not emit anything if the resulting URL is undefined? So maybe we need the linkedSignal after all?

    loadResource() {
        this.lazyResource = httpResource(
            () =>
                this.id()
                    ? `https://jsonplaceholder.typicode.com/users/${this.id()}`
                    : undefined,
            { injector: this.injector }
        );
    }

    constructor() {
        effect(() => {
            this.lazyResource?.value();
            console.log('Load..', this.id());
        });
    }
}
