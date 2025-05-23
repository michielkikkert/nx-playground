import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'lib-layout',
    imports: [
        CommonModule,
        RouterOutlet,
        MatMenu,
        MatMenuTrigger,
        RouterLink,
        MatButton,
        MatMenuItem,
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
})
export class LayoutComponent {}
