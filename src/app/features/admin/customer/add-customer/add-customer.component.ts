import { Component } from '@angular/core';
import { AddCustomerRequest } from '../models/add-customer-request.model';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

  model:AddCustomerRequest;

  constructor(private customerService : CustomerService,private router:Router,private toastr: ToastrService){
    
    this.model = {
      firstName:'',
      lastName:'',
      email:'',
      mobile:'',
      address:''
    }
  }

  onFormSubmit(){
    this.customerService.addCustomer(this.model).subscribe({
      next:(response)=>{
        this.toastr.success('',`Customer added successfully !`, {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/admin/customers');
      },
      error:(err)=>{
        console.log(err);
        // this.toastr.error('', err.error.errors[''][0], {
        //   timeOut: 3000,
        // });

        this.toastr.error('', 'Oops something went wrong', {
            timeOut: 3000,
          });
      }
    });
  }

}
