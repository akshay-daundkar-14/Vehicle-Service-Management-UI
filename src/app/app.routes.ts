import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { CarouselComponent } from './core/components/carousel/carousel.component';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';
import { VehicleListComponent } from './features/admin/vehicle/vehicle-list/vehicle-list.component';
import { AddVehicleComponent } from './features/admin/vehicle/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './features/admin/vehicle/edit-vehicle/edit-vehicle.component';
import { DeleteVehicleComponent } from './features/admin/vehicle/delete-vehicle/delete-vehicle.component';
import { CustomerListComponent } from './features/admin/customer/customer-list/customer-list.component';
import { AddCustomerComponent } from './features/admin/customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './features/admin/customer/edit-customer/edit-customer.component';
import { DeleteCustomerComponent } from './features/admin/customer/delete-customer/delete-customer.component';
import { MaterialListComponent } from './features/admin/material/material-list/material-list.component';
import { AddMaterialComponent } from './features/admin/material/add-material/add-material.component';
import { EditMaterialComponent } from './features/admin/material/edit-material/edit-material.component';
import { DeleteMaterialComponent } from './features/admin/material/delete-material/delete-material.component';
import { ServiceRepresentativeListComponent } from './features/admin/service representative/service-representative-list/service-representative-list.component';
import { AddServiceRepresentativeComponent } from './features/admin/service representative/add-service-representative/add-service-representative.component';
import { EditServiceRepresentativeComponent } from './features/admin/service representative/edit-service-representative/edit-service-representative.component';
import { DeleteServiceRepresentativeComponent } from './features/admin/service representative/delete-service-representative/delete-service-representative.component';
import { ListVehicleComponent } from './features/admin/admin functionality/list-vehicle/list-vehicle/list-vehicle.component';
import { AssignAdvisorComponent } from './features/admin/admin functionality/assign-advisor/assign-advisor.component';
import { SaVehicleListComponent } from './features/service advisor/sa-vehicle-list/sa-vehicle-list/sa-vehicle-list.component';
import { SaInvoiceComponent } from './features/service advisor/sa-invoice/sa-invoice/sa-invoice.component';
import { authGuard } from './features/auth/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
     component: CarouselComponent,
    //component: ListVehicleComponent,
    pathMatch: 'full',
  },

  // *************** Admin Related Routing **********

  // -------- Vehicle -----------

  {
    path: 'admin/vehicles',
    component: VehicleListComponent,
    canActivate:[authGuard]
  },

  {
    path: 'admin/vehicles/add',
    component: AddVehicleComponent,
    canActivate:[authGuard]
  },

  {
    path: 'admin/vehicles/edit/:id',
    component: EditVehicleComponent,
    canActivate:[authGuard]
  },

  {
    path: 'admin/vehicles/delete/:id',
    component: DeleteVehicleComponent,
    canActivate:[authGuard]
  },

  // -------- Customer -----------

  {
    path: 'admin/customers',
    component: CustomerListComponent,
    canActivate:[authGuard]
  },

  {
    path: 'admin/customers/add',
    component: AddCustomerComponent,
    canActivate:[authGuard]
  },

  {
    path: 'admin/customers/edit/:id',
    component: EditCustomerComponent,
    canActivate:[authGuard]
  },

  {
    path: 'admin/customers/delete/:id',
    component: DeleteCustomerComponent,
    canActivate:[authGuard]
  },

    // -------- Material -----------

    {
      path: 'admin/materials',
      component: MaterialListComponent,
      canActivate:[authGuard]
    },

    {
      path: 'admin/materials/add',
      component: AddMaterialComponent,
      canActivate:[authGuard]
    },
  
    {
      path: 'admin/materials/edit/:id',
      component: EditMaterialComponent,
      canActivate:[authGuard]
    },
  
    {
      path: 'admin/materials/delete/:id',
      component: DeleteMaterialComponent,
      canActivate:[authGuard]
    },

        // -------- Service Representative -----------

        {
          path: 'admin/servicerepresentatives',
          component: ServiceRepresentativeListComponent,
          canActivate:[authGuard]
        },
    
        {
          path: 'admin/servicerepresentatives/add',
          component: AddServiceRepresentativeComponent,
          canActivate:[authGuard]
        },
      
        {
          path: 'admin/servicerepresentatives/edit/:id',
          component: EditServiceRepresentativeComponent,
          canActivate:[authGuard]
        },
      
        {
          path: 'admin/servicerepresentatives/delete/:id',
          component: DeleteServiceRepresentativeComponent,
          canActivate:[authGuard]
        },

        //-----------  Admin Functionality -------------------


        {
          path:'admin',
          component:ListVehicleComponent,
          canActivate:[authGuard]
        },

        {
          path:'admin/assignsa/:id',
          component:AssignAdvisorComponent,
          canActivate:[authGuard]
        },


//********************  Service Advisor Functionality ********************
       

        {
          path:'sa/vehicles',
          component:SaVehicleListComponent
        },

        {
          path:'sa/invoice/:id',
          component:SaInvoiceComponent
        },



  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];
