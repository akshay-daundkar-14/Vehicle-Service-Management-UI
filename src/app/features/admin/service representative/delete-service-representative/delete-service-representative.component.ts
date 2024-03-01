import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetServiceRepresentativeResponse } from '../models/get-service-representative-response.model';
import { ServiceRepresentativeService } from '../services/service-representative.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-service-representative',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './delete-service-representative.component.html',
  styleUrl: './delete-service-representative.component.css'
})
export class DeleteServiceRepresentativeComponent {
  model?:GetServiceRepresentativeResponse ;
  id:string | null = null;

  constructor(private route:ActivatedRoute,private serviceRepresentativeService:ServiceRepresentativeService,private toastr:ToastrService,private router:Router){}


  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(param)=>{
        this.id = param.get('id');


        // get ServiceRepresentative by id

        this.serviceRepresentativeService.getServiceRepresentativeById(Number(this.id)).subscribe({
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
 

    this.serviceRepresentativeService.deleteServiceRepresentative(Number(this.id)).subscribe({
      next:(response)=>{
        this.toastr.success('',`Representative Deleted successfully`, {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/admin/servicerepresentatives');
      },
      error:(err)=>{
        this.toastr.error('', err.error.errors[''][0], {
          timeOut: 3000,
        });
      }
    });
  }
}
