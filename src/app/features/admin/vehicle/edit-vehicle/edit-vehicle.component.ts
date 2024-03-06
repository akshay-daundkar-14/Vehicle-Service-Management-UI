import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { GetVehicleResponse } from '../models/get-vehicle-response.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditVehicleRequest } from '../models/edit-vehicle-request.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-vehicle',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.css'
})
export class EditVehicleComponent implements OnInit {

  model?:GetVehicleResponse ;
  id:string | null = null;

  constructor(private route:ActivatedRoute,private vehicleService:VehicleService,private toastr:ToastrService,private router:Router){}


  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(param)=>{
        this.id = param.get('id');


        // get vehicle by id

        this.vehicleService.getVehicleById(Number(this.id)).subscribe({
          next:(res)=>{
            this.model = res;
          },
          error:(err)=>{
            console.log(err)
          }
        });

      }
    });
  }


  onFormSubmit(){

     const vehicle:EditVehicleRequest = {
      vehicleBrand : this.model?.vehicleBrand,
      vehicleCategory : this.model?.vehicleCategory,
      vehicleId : Number(this.id),
      vehicleModel : this.model?.vehicleModel,
      vehicleNumber : this.model?.vehicleNumber,
      vehicleRegNo : this.model?.vehicleRegNo,
      vehicleStatus : "Pending"
     }

    this.vehicleService.editVehicle(Number(this.id),vehicle).subscribe({
      next:(response)=>{
        this.toastr.success('',`Vehicle updated successfully!`, {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/admin/vehicles');
      },
      error:(err)=>{
        this.toastr.error('', err.error.errors[''][0], {
          timeOut: 3000,
        });
      }
    });
  }


}
