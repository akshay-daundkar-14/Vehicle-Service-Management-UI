import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { GetVehicleResponse } from '../models/get-vehicle-response.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [RouterLink, CommonModule,DataTablesModule],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css',
})
export class VehicleListComponent implements OnInit {
  vehicles?: GetVehicleResponse[];
  dtoptions:DataTables.Settings = {};

  constructor(
    private vehicleService: VehicleService,
    private toastr: ToastrService
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
}
