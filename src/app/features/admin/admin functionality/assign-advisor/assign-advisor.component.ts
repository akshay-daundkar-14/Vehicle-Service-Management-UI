import { Component } from '@angular/core';
import { EditVehicleRequest } from '../../vehicle/models/edit-vehicle-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../vehicle/services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { GetVehicleResponse } from '../../vehicle/models/get-vehicle-response.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceRepresentativeService } from '../../service representative/services/service-representative.service';
import { GetServiceRepresentativeResponse } from '../../service representative/models/get-service-representative-response.model';
import { AdminFunctionalitiesService } from '../services/admin-functionalities.service';
import { AddScheduledServiceRequest } from '../models/add-scheduled-service-request.model';

@Component({
  selector: 'app-assign-advisor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './assign-advisor.component.html',
  styleUrl: './assign-advisor.component.css',
})
export class AssignAdvisorComponent {
  model?: GetVehicleResponse;
  id: string | null = null;
  dropdownValues:GetServiceRepresentativeResponse[] | null = null;
  selectedServiceAdvisorId: string = '';
  scheduleVehicle?:Date;


  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router,
    private serviceAdvisorService : ServiceRepresentativeService,
    private adminFunctionalitiesService : AdminFunctionalitiesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');

        // get vehicle by id

        this.vehicleService.getVehicleById(Number(this.id)).subscribe({
          next: (res) => {
            this.model = res;
          },
          error: (err) => {
            console.log(err);
          },
        });

        // get all service Advisors

        this.serviceAdvisorService.getAllServiceRepresentatives().subscribe({
          next:(res)=>{
            console.log('Service Advisor',res);
            this.dropdownValues = res;
          },
          error:(err)=>
          {
            console.log(err);

          }
        });
      },
    });
  }

  onFormSubmit() {
    
    // console.log('Vehicle Id : ' +this.id);
    // console.log('Service Representative Id : '+this.selectedServiceAdvisorId);

    const vehicle:EditVehicleRequest = {
      vehicleBrand : this.model?.vehicleBrand,
      vehicleCategory : this.model?.vehicleCategory,
      vehicleId : Number(this.id),
      vehicleModel : this.model?.vehicleModel,
      vehicleNumber : this.model?.vehicleNumber,
      vehicleRegNo : this.model?.vehicleRegNo,
      vehicleStatus : 'In Progress'      
     }

    this.vehicleService.editVehicle(Number(this.id),vehicle).subscribe({
      next:(response)=>{

        const model : AddScheduledServiceRequest = {
          vehicleID :Number(this.id),
          serviceAdvisorID : Number(this.selectedServiceAdvisorId),
          scheduledDate: this.scheduleVehicle
        }

         this.adminFunctionalitiesService.addScheduledService(model).subscribe({
          next:(res)=>{
              this.toastr.success('',`Scheduled successfully!`, {
                    timeOut: 3000,
                });
              this.router.navigateByUrl('/admin');
          },
          error:(err)=>{
            console.log(err);
            this.toastr.error('',`Oops something went wrong`, {
              timeOut: 3000,
          });
          }
         });

      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('', err.error.errors[''][0], {
          timeOut: 3000,
        });
      }
    });


  }
}
