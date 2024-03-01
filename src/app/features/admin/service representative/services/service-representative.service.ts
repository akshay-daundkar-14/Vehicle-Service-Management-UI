import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetServiceRepresentativeResponse } from '../models/get-service-representative-response.model';
import { environment } from '../../../../../environments/environment';
import { AddServiceRepresentativeRequest } from '../models/add-service-representative.model';
import { EditServiceRepresentativeRequest } from '../models/edit-service-representative-request.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceRepresentativeService {

  constructor(private http:HttpClient) { }

  getAllServiceRepresentatives():Observable<GetServiceRepresentativeResponse[]>{
   return this.http.get<GetServiceRepresentativeResponse[]>(`${environment.apiBaseUrl}/api/ServiceRepresentatives`);
  }

  addServiceRepresentative(model:AddServiceRepresentativeRequest):Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/ServiceRepresentatives`,model);
  }


  getServiceRepresentativeById(id:number):Observable<GetServiceRepresentativeResponse>{
    return this.http.get<GetServiceRepresentativeResponse>(`${environment.apiBaseUrl}/api/ServiceRepresentatives/${id}`);
  }

  editServiceRepresentative(id:number,ServiceRepresentative:EditServiceRepresentativeRequest):Observable<void>{
    return this.http.put<void>(`${environment.apiBaseUrl}/api/ServiceRepresentatives/${id}`,ServiceRepresentative);
  }

  deleteServiceRepresentative(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/ServiceRepresentatives/${id}`);
  }

}
