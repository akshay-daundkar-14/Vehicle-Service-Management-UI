import { Component } from '@angular/core';
import { AddServiceRepresentativeRequest } from '../models/add-service-representative.model';
import { ServiceRepresentativeService } from '../services/service-representative.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-service-representative',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './add-service-representative.component.html',
  styleUrl: './add-service-representative.component.css'
})
export class AddServiceRepresentativeComponent {

  model:AddServiceRepresentativeRequest;

  constructor(private serviceRepresentativeService : ServiceRepresentativeService,private router:Router,private toastr: ToastrService){
    
    this.model = {
      firstName:'',
      lastName:'',
      email:'',
      contactNumber:'',
    }
  }

  onFormSubmit(){
    this.serviceRepresentativeService.addServiceRepresentative(this.model).subscribe({
      next:(response)=>{
        this.toastr.success('',`Representative added successfully`, {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/admin/servicerepresentatives');
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
