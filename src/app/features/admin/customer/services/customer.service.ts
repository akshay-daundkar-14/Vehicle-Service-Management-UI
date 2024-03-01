import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCustomerResponse } from '../models/get-customer-response.model';
import { environment } from '../../../../../environments/environment';
import { AddCustomerRequest } from '../models/add-customer-request.model';
import { EditCustomerRequest } from '../models/edit-customer-request.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getCustomers():Observable<GetCustomerResponse[]>{
    return this.http.get<GetCustomerResponse[]>(`${environment.apiBaseUrl}/api/customers`);
  }

  addCustomer(model:AddCustomerRequest):Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/customers`,model);
  }


  getCustomerById(id:number):Observable<GetCustomerResponse>{
    return this.http.get<GetCustomerResponse>(`${environment.apiBaseUrl}/api/customers/${id}`);
  }

  editCustomer(id:number,customer:EditCustomerRequest):Observable<void>{
    return this.http.put<void>(`${environment.apiBaseUrl}/api/customers/${id}`,customer);
  }

  deleteCustomer(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/customers/${id}`);
  }

}
