import { Component } from '@angular/core';
import { AddMaterialRequest } from '../models/add-material-request.model';
import { MaterialService } from '../services/material.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-material',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-material.component.html',
  styleUrl: './add-material.component.css'
})
export class AddMaterialComponent {
  model:AddMaterialRequest;

  constructor(private materialService : MaterialService,private router:Router,private toastr: ToastrService){
    
    this.model = {
      itemName : "",
      cost : 0
    }
  }

  onFormSubmit(){
    this.materialService.addMaterial(this.model).subscribe({
      next:(response)=>{
        this.toastr.success('',`Material added successfully !`, {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/admin/materials');
      },
      error:(err)=>{
        this.toastr.error('', 'Oops something went wrong', {
          timeOut: 3000,
        });
      }
    });
  }

}
