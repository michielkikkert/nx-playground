import { Component, effect, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-home',
    imports: [CommonModule, MatSlideToggle, FormsModule, MatButton],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    toggle = model();

    constructor() {
        effect(() => {
            console.log(this.toggle());
        });
    }

    flip() {
        this.toggle.set(!this.toggle());
    }
}
