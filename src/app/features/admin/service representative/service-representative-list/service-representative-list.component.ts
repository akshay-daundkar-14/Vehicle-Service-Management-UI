import { Component, OnInit } from '@angular/core';
import { ServiceRepresentativeService } from '../services/service-representative.service';
import { GetServiceRepresentativeResponse } from '../models/get-service-representative-response.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-service-representative-list',
  standalone: true,
  imports: [CommonModule,RouterLink,DataTablesModule],
  templateUrl: './service-representative-list.component.html',
  styleUrl: './service-representative-list.component.css'
})
export class ServiceRepresentativeListComponent implements OnInit {

  models?:GetServiceRepresentativeResponse[];
  dtoptions:DataTables.Settings = {};

  constructor(private serviceRepresentative : ServiceRepresentativeService){}



  ngOnInit(): void {

    this.dtoptions = {
      pagingType:'full_numbers'
    };

     this.serviceRepresentative.getAllServiceRepresentatives().subscribe({
      next:(res)=>{
        console.log(res);
        this.models = res;
      },
      error : (err)=>{
        console.log(err);
      }
     });
  }

  

}
