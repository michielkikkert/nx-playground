import { Route } from '@angular/router';
import { LayoutComponent } from '../../../../libs/components/src/lib/layout/layout.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./containers/home/home.component').then( (comp) => comp.HomeComponent )
            },
            {
                path: 'step1',
                loadComponent: () => import('./containers/step1/step1.component').then( (comp) => comp.Step1Component )
            },
            {
                path: 'step2',
                loadComponent: () => import('./containers/step2/step2.component').then( (comp) => comp.Step2Component )
            },
        ]
    }
];
