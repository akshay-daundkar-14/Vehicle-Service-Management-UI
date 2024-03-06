import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { GetVehicleResponse } from '../../../admin/vehicle/models/get-vehicle-response.model';
import { VehicleService } from '../../../admin/vehicle/services/vehicle.service';
import { ServiceAdvisorService } from '../../services/service-advisor.service';
import { Subject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-sa-vehicle-list',
  standalone: true,
  imports: [RouterLink, CommonModule,DataTablesModule],
  templateUrl: './sa-vehicle-list.component.html',
  styleUrl: './sa-vehicle-list.component.css'
})
export class SaVehicleListComponent implements OnInit, OnDestroy {
  vehicles?: GetVehicleResponse[] = [];
  dtoptions:DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private serviceAdvisor : ServiceAdvisorService
  ) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {


    this.dtoptions = {
      pagingType:'full_numbers'
    };

    

    this.serviceAdvisor.getScheduledVehicles(6).subscribe({
      next: (scheduledVehicles) => {
        const vehicleRequests = scheduledVehicles.map((element) =>
          this.vehicleService.getVehicleById(element.vehicleID)
        );
  
        forkJoin(vehicleRequests).subscribe({
          next: (vehicleDetails) => {
            this.vehicles = vehicleDetails.filter(c => c.vehicleStatus === 'In Progress');
            this.dtTrigger.next(null);
           
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
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
  

}
