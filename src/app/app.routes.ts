import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { CarouselComponent } from './core/components/carousel/carousel.component';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component : CarouselComponent,
        pathMatch: 'full'
    },
    //Wild Card Route for 404 request 
    { path: '**', pathMatch: 'full',  
        component: PagenotfoundComponent },
];
