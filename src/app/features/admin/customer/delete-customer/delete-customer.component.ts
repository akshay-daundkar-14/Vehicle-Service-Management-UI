import { Component } from '@angular/core';
import { GetCustomerResponse } from '../models/get-customer-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-customer',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './delete-customer.component.html',
  styleUrl: './delete-customer.component.css'
})
export class DeleteCustomerComponent {
  model?:GetCustomerResponse ;
  id:string | null = null;

  constructor(private route:ActivatedRoute,private customerService:CustomerService,private toastr:ToastrService,private router:Router){}


  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(param)=>{
        this.id = param.get('id');


        // get Customer by id

        this.customerService.getCustomerById(Number(this.id)).subscribe({
          next:(res)=>{
            this.model = res;
          },
          error:(err)=>{
            this.toastr.error('', err.error.errors[''][0], {
              timeOut: 3000,
            });
          }
        });

      }
    });
  }


  onFormSubmit(){
 

    this.customerService.deleteCustomer(Number(this.id)).subscribe({
      next:(response)=>{
        this.toastr.success('',`Customer Deleted successfully`, {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/admin/customers');
      },
      error:(err)=>{
        this.toastr.error('', err.error.errors[''][0], {
          timeOut: 3000,
        });
      }
    });
  }


}
