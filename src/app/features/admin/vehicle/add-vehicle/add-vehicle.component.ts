import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddVehicleRequest } from '../models/add-vehicle-request.model';
import { VehicleService } from '../services/vehicle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent {

  model:AddVehicleRequest;

  constructor(private vehicleService : VehicleService,private router:Router,private toastr: ToastrService){
    
    this.model = {
      vehicleCategory : '',
      vehicleBrand :'',
      vehicleModel:'',
      vehicleNumber:'',
      vehicleRegNo:''
    }
  }

  onFormSubmit(){
    this.vehicleService.addVehicle(this.model).subscribe({
      next:(response)=>{
        this.toastr.success('',`Vehicle added successfully !`, {
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
