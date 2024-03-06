import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { GetVehicleResponse } from '../../../admin/vehicle/models/get-vehicle-response.model';
import { VehicleService } from '../../../admin/vehicle/services/vehicle.service';
import { ServiceAdvisorService } from '../../services/service-advisor.service';
import { Subject, forkJoin } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/models/user.model';
import { ServiceRepresentativeService } from '../../../admin/service representative/services/service-representative.service';

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
  loader:boolean = true;

  constructor(
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private serviceAdvisor : ServiceAdvisorService,
    private authService : AuthService,
    private serviceRepresentativeService : ServiceRepresentativeService
  ) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {


    this.dtoptions = {
      pagingType:'full_numbers'
    };

    // Get user details like email

    const user : User | undefined= this.authService.getUser();

    // get service representative_id by email

    this.serviceRepresentativeService.getServiceRepresentativeByEmail(user?.email)
    .subscribe({
      next:(res)=>{
        this.serviceAdvisor.getScheduledVehicles(res.representativeID).subscribe({
          next: (scheduledVehicles) => {
            const vehicleRequests = scheduledVehicles.map((element) =>
              this.vehicleService.getVehicleById(element.vehicleID)
            );
      
            forkJoin(vehicleRequests).subscribe({
              next: (vehicleDetails) => {
                this.loader = false;
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
      },
      error:(err)=>{
        console.error();
      }
      
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
