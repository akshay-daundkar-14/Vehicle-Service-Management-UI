import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { GetVehicleResponse } from '../../../admin/vehicle/models/get-vehicle-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../admin/vehicle/services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { MaterialService } from '../../../admin/material/services/material.service';
import { GetMaterialResponse } from '../../../admin/material/models/get-material-response.model';
import { ServiceAdvisorService } from '../../services/service-advisor.service';
import { EditVehicleRequest } from '../../../admin/vehicle/models/edit-vehicle-request.model';
import { ServiceRepresentativeService } from '../../../admin/service representative/services/service-representative.service';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-sa-invoice',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sa-invoice.component.html',
  styleUrl: './sa-invoice.component.css',
})
export class SaInvoiceComponent {
  model?: GetVehicleResponse;
  id: string | null = null;
  invoiceDetails?: FormArray<any>;
  items: GetMaterialResponse[]=[];


  invoiceForm: FormGroup = this.builder.group({
    vehicleCategory: this.builder.control({ value: '', disabled: true }),
    vehicleRegNo: this.builder.control({ value: '', disabled: true }),
    vehicleNumber: this.builder.control({ value: '', disabled: true }),
    vehicleModel: this.builder.control({ value: '', disabled: true }),
    vehicleBrand: this.builder.control({ value: '', disabled: true }),
    nettotal: this.builder.control({ value: '', disabled: true }),
    details: this.builder.array([]),
  });

  invoiceProducts = this.invoiceForm.get('details') as FormArray;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router,
    private builder: FormBuilder,
    private materialService: MaterialService,
    private serviceAdvisorService : ServiceAdvisorService,
    private authService : AuthService,
    private serviceRepresentativeService : ServiceRepresentativeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');

        // get vehicle by id

        this.vehicleService.getVehicleById(Number(this.id)).subscribe({
          next: (res) => {
            this.model = res; 

            this.invoiceForm.patchValue({
              vehicleCategory: this.model.vehicleCategory,
              vehicleRegNo: this.model.vehicleRegNo,
              vehicleNumber: this.model.vehicleNumber,
              vehicleModel: this.model.vehicleModel,
              vehicleBrand: this.model.vehicleBrand,
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });

    this.getItems();
  }

  addNewProduct() {
    this.invoiceDetails = this.invoiceForm.get('details') as FormArray;
    this.invoiceDetails.push(this.generateRow());
  }


  generateRow() {
    return this.builder.group({
      itemCode: this.builder.control(''),
      quantity: this.builder.control(''),
      // price: this.builder.control({ value: 0, disabled: true }),
      // total: this.builder.control({ value: 0, disabled: true }),
      price: this.builder.control('0'),
      total: this.builder.control('0'),
      itemName: this.builder.control(''),
    });
  }

  getItems() {
    this.materialService.getMaterials().subscribe({
      next: (res) => {
        this.items = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  
  onItemChange(index: number) {
    //debugger;
    const selectedRow = this.invoiceProducts.controls[index] as FormGroup;
    const selectedItemId = selectedRow?.get('itemName')?.value;

    const selectedItem = this.items.find((item) => item.itemID == selectedItemId);

    if (selectedItem) {
      selectedRow.patchValue({
        price: selectedItem.cost,
        quantity:1
        // itemName: selectedItem.itemName, 
      });
      this.updateRow(index);
    } else {
      // Handle invalid item selection (optional)
      console.warn('Invalid item selected');
      selectedRow?.get('price')?.setValue(0);
      selectedRow?.get('total')?.setValue(0);
    }
  }

  updateRow(index: number) {
    const selectedRow = this.invoiceProducts.controls[index] as FormGroup;
    const quantity = selectedRow?.get('quantity')?.value;
    const price = selectedRow?.get('price')?.value;
    const total = quantity * price;
    selectedRow?.get('total')?.setValue(total);

    this.summaryTotal(); // Update overall total (optional)
  }

  summaryTotal() {
    let array = this.invoiceForm.getRawValue().details;
    let sumTotal = 0;
    array.forEach((element : any) => {
      sumTotal = sumTotal+ Number(element.total);
    });
    this.invoiceForm.get('nettotal')?.setValue(sumTotal);
  }
 

  removeProductRow(index: number) {
    this.invoiceProducts.removeAt(index);
  }

  //------ Save Details ----

  saveInvoice() {
    // console.log(this.invoiceForm.value);
    // console.log(this.model);
    // console.log('Get service advisor from localstorage ',6);

    // Get user details like email

    const user : User | undefined= this.authService.getUser();

    // get service representative_id by email

    this.serviceRepresentativeService.getServiceRepresentativeByEmail(user?.email).subscribe({
      next:(res)=>{
        this.serviceAdvisorService.addServiceRecord({
          vehicleID:this.model?.vehicleId,
          representativeID : res.representativeID, // Need to fetch it when login,
          customerId : 1 // Static value as of now
        }).subscribe({
          next :(res)=>{
            console.log("add service record ",res);
    
            this.invoiceForm.value.details.forEach((element:any) => {
              this.serviceAdvisorService.addServiceRecordItem({
                serviceRecordID : res.serviceRecordID,
                itemID : element.itemName,
                quantity : element.quantity,
                price : element.price,
                total : element.total,
              }).subscribe({
                next : (res)=>{
                  console.log("addServiceRecordItem",res);
                },
                error:(err)=>{
                  console.log("addServiceRecordItem",err);
                }
              });
            });
    
           
    
            const vehicle:EditVehicleRequest = {
              vehicleBrand : this.model?.vehicleBrand,
              vehicleCategory : this.model?.vehicleCategory,
              vehicleId : Number(this.id),
              vehicleModel : this.model?.vehicleModel,
              vehicleNumber : this.model?.vehicleNumber,
              vehicleRegNo : this.model?.vehicleRegNo,
              vehicleStatus : 'Completed'      
             }
    
             this.vehicleService.editVehicle(Number(this.id),vehicle).subscribe({
              next:(res)=>{
                console.log("update vehicle status",res);
                this.router.navigateByUrl('/sa/vehicles');
                this.toastr.success('','Vehicle Service Done!');
              },
              error:(err)=>{
                console.log("update vehicle status",err);
                this.toastr.error('','Oops something went wrong!');
              }
             });
    
          },
          error:(err)=>{
            console.log(err);
            this.toastr.error('','Oops something went wrong!');
          }
        });
      },
      error:(err)=>{
        this.toastr.error('error fetching advisor id',"Oops..");
      }
    }); 

  }

}
