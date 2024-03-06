import { Component } from '@angular/core';
import { GetCustomerResponse } from '../models/get-customer-response.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { EditCustomerRequest } from '../models/edit-customer-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css',
})
export class EditCustomerComponent {
  model?: GetCustomerResponse;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');

        // get Customer by id

        this.customerService.getCustomerById(Number(this.id)).subscribe({
          next: (res) => {
            this.model = res;
          },
          error: (err) => {
            this.toastr.error('', err.error.errors[''][0], {
              timeOut: 3000,
            });
          },
        });
      },
    });
  }

  onFormSubmit() {
    const customer: EditCustomerRequest = {
      firstName: this.model?.firstName,
      lastName: this.model?.lastName,
      email: this.model?.email,
      mobile: this.model?.mobile,
      address: this.model?.address,
      customerId: this.model?.customerId,
    };

    this.customerService.editCustomer(Number(this.id), customer).subscribe({
      next: (response) => {
        this.toastr.success('', `Customer updated successfully!`, {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/admin/customers');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('', 'Oops something went wrong', {
          timeOut: 3000,
        });
      },
    });
  }
}
