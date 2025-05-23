import { Component, computed, effect, inject, Injector, linkedSignal, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { httpResource, HttpResourceRef } from '@angular/common/http';

@Component({
    selector: 'app-home',
    imports: [CommonModule, MatSlideToggle, FormsModule, MatButton],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    injector = inject(Injector); // Needed for lazy httpResource
    toggle = model();
    id = model(2);
    requestId = linkedSignal<number, number | undefined>({
        source: this.id,
        computation: (newVal, previous) => {
            if(!newVal) {
                // Why .value? even prevous.source works. I would expect new & prev to be same type here? Also, ? is needed here because... ? Why...?
                // I must type the previous as undefined as well as otherwise TS is complaining? But how? previous is a signal so should always have a value?
                return previous?.value
            }
            // So I can just return newVal here.. not newVal.value like previous? Inconsistency is unexpected here?
            return newVal;
        }
    });
    eagerResource = httpResource(() => `https://jsonplaceholder.typicode.com/todos/${this.requestId()}`);
    lazyResource: HttpResourceRef<any> | undefined;

    loadResource() {
        this.lazyResource = httpResource(() => `https://jsonplaceholder.typicode.com/users/${this.requestId()}`, {injector: this.injector});
    }

    constructor() {
        effect(() => {
            this.lazyResource?.value();
            console.log('Load..', this.id())
        })
    }
}
