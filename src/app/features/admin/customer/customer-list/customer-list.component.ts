import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { GetCustomerResponse } from '../models/get-customer-response.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule,RouterLink,DataTablesModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  customers?:GetCustomerResponse[];
  dtoptions:DataTables.Settings = {};

  constructor(private customerService:CustomerService,private toastr:ToastrService){}


  ngOnInit(): void {

    this.dtoptions = {
      pagingType:'full_numbers'
    };

    this.customerService.getCustomers().subscribe({
      next:(res)=>{
        this.customers = res;
      },
      error:(err)=>{
        this.toastr.error('', err.error.errors[''][0], {
          timeOut: 3000,
        });
      }
    });

    

  }



}
