import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { GetVehicleResponse } from '../models/get-vehicle-response.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-vehicle',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './delete-vehicle.component.html',
  styleUrl: './delete-vehicle.component.css'
})
export class DeleteVehicleComponent implements OnInit{


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

   this.vehicleService.deleteVehicle(Number(this.id)).subscribe({
     next:(response)=>{
       this.toastr.success('',`Vehicle deleted successfully!`, {
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
