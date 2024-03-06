import { Component } from '@angular/core';
import { GetVehicleResponse } from '../../../vehicle/models/get-vehicle-response.model';
import { VehicleService } from '../../../vehicle/services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AdminFunctionalitiesService } from '../../services/admin-functionalities.service';

@Component({
  selector: 'app-list-vehicle',
  standalone: true,
  imports: [RouterLink, CommonModule,DataTablesModule],
  templateUrl: './list-vehicle.component.html',
  styleUrl: './list-vehicle.component.css'
})
export class ListVehicleComponent {
  vehicles?: GetVehicleResponse[];
  dtoptions:DataTables.Settings = {};

  constructor(
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private adminService : AdminFunctionalitiesService
  ) {}

  ngOnInit(): void {


    this.dtoptions = {
      pagingType:'full_numbers'
    };

    this.vehicleService.getVehicles().subscribe({
      next: (res) => {
       
        this.vehicles = res;
      },
      error: (err) => {
        this.toastr.error('', err.error.errors[''][0], {
          timeOut: 3000,
        });
      },
    });
  }

  getStatusBadge(status: string): string {
    let badgeClass: string;
  
    switch (status) {
      case 'Pending':
        badgeClass = 'text-bg-danger';
        break;
      case 'In Progress':
        badgeClass = 'text-bg-warning';
        break;
      default:
        badgeClass = 'text-bg-success';
    }
  
    return `badge ${badgeClass}`;
  }


  downloadInvoice(vehicleId : number){

    this.adminService.downloadInvoice(vehicleId).subscribe({
      next:(res)=>{
        console.log("invoice downloaded",res);
      },
      error:(err)=>{
        console.log("invoice download error ",err);
      }
    });
  }

}
