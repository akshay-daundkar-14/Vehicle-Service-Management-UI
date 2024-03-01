import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { CarouselComponent } from './core/components/carousel/carousel.component';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';
import { VehicleListComponent } from './features/admin/vehicle/vehicle-list/vehicle-list.component';
import { AddVehicleComponent } from './features/admin/vehicle/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './features/admin/vehicle/edit-vehicle/edit-vehicle.component';
import { DeleteVehicleComponent } from './features/admin/vehicle/delete-vehicle/delete-vehicle.component';

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
    


    // *************** Admin Related Routing **********


    // -------- Vehicle -----------

    {
        path:'admin/vehicles',
        component:VehicleListComponent
    },

    {
        path:'admin/vehicles/add',
        component:AddVehicleComponent
    },

    {
        path:'admin/vehicles/edit/:id',
        component:EditVehicleComponent
    },

    {
        path:'admin/vehicles/delete/:id',
        component:DeleteVehicleComponent
    },







    //Wild Card Route for 404 request 
    { path: '**', pathMatch: 'full',  
        component: PagenotfoundComponent },
];
