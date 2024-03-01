import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { GetVehicleResponse } from '../models/get-vehicle-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit{


  vehicles?: GetVehicleResponse[];

constructor(private vehicleService : VehicleService){}

  ngOnInit(): void {

    this.vehicleService.getVehicles().subscribe({
      next:(res)=>{
        this.vehicles = res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
   
  }


}
