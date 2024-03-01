import { Component } from '@angular/core';
import { GetMaterialResponse } from '../models/get-material-response.model';
import { MaterialService } from '../services/material.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [RouterLink, CommonModule,DataTablesModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css'
})
export class MaterialListComponent {
  materials?: GetMaterialResponse[];
  dtoptions:DataTables.Settings = {};

  constructor(
    private materialService: MaterialService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.dtoptions = {
      pagingType:'full_numbers'
    };

    this.materialService.getMaterials().subscribe({
      next: (res) => {
        console.log(res);
        this.materials = res;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('', err.error.errors[''][0], {
          timeOut: 3000,
        });
      },
    });
  }
}
