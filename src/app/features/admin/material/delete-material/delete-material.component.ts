import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../services/material.service';
import { ToastrService } from 'ngx-toastr';
import { GetMaterialResponse } from '../models/get-material-response.model';

@Component({
  selector: 'app-delete-material',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './delete-material.component.html',
  styleUrl: './delete-material.component.css'
})
export class DeleteMaterialComponent {


  id:string | null = null;
  model?:GetMaterialResponse;

  constructor(private router:ActivatedRoute,private materialService:MaterialService,private toastr:ToastrService,private route:Router){}


  ngOnInit(): void {
     this.router.paramMap.subscribe({
      next:(param)=>{
        this.id = param.get('id');

        this.materialService.getMaterialById(Number(this.id)).subscribe({
          next:(res)=>{
            this.model = res;
            
          },
          error:(err)=>{
            console.log(err);
           
          }
        });


      }
     })
  }

  onFormSubmit(){
    this.materialService.deleteMaterial(Number(this.id)).subscribe({
      next:(res)=>{
             this.toastr.success('','Material Deleted Successfully !');
             this.route.navigateByUrl('/admin/materials');
      },
      error:(err)=>{
        this.toastr.success('','Oops something went wrong');
      }
    });
  }

}
