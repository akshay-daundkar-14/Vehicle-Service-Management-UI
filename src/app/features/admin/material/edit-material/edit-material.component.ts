import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../services/material.service';
import { ToastrService } from 'ngx-toastr';
import { GetMaterialResponse } from '../models/get-material-response.model';

@Component({
  selector: 'app-edit-material',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-material.component.html',
  styleUrl: './edit-material.component.css'
})
export class EditMaterialComponent implements OnInit{

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
    this.materialService.editMaterial(Number(this.id),this.model).subscribe({
      next:(res)=>{
             this.toastr.success('','Material Edited Successfully !');
             this.route.navigateByUrl('/admin/materials');
      },
      error:(err)=>{
        this.toastr.success('','Oops something went wrong');
      }
    });
  }



}
