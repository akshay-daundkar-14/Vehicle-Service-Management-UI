import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetServiceRepresentativeResponse } from '../models/get-service-representative-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceRepresentativeService } from '../services/service-representative.service';
import { ToastrService } from 'ngx-toastr';
import { EditServiceRepresentativeRequest } from '../models/edit-service-representative-request.model';



@Component({
  selector: 'app-edit-service-representative',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-service-representative.component.html',
  styleUrl: './edit-service-representative.component.css'
})
export class EditServiceRepresentativeComponent {
  model?: GetServiceRepresentativeResponse;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private serviceRepresentativeService: ServiceRepresentativeService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');

        // get ServiceRepresentative by id

        this.serviceRepresentativeService.getServiceRepresentativeById(Number(this.id)).subscribe({
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
    const serviceRepresentative: EditServiceRepresentativeRequest = {
      firstName: this.model?.firstName,
      lastName: this.model?.lastName,
      email: this.model?.email,
      contactNumber: this.model?.contactNumber,
      representativeID: this.model?.representativeID,
    };

    this.serviceRepresentativeService.editServiceRepresentative(Number(this.id), serviceRepresentative).subscribe({
      next: (response) => {
        this.toastr.success('', `Representative updated successfully!`, {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/admin/servicerepresentatives');
      },
      error: (err) => {
        
        this.toastr.error('', 'Oops something went wrong', {
          timeOut: 3000,
        });
      },
    });
  }
}
