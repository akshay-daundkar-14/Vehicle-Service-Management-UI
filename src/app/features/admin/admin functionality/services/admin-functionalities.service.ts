import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddScheduledServiceRequest } from '../models/add-scheduled-service-request.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminFunctionalitiesService {

  constructor(private http:HttpClient) { }


  addScheduledService(model:AddScheduledServiceRequest):Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/ScheduledServices`,model);
  }

  downloadInvoice(id:number):Observable<void>{
    return this.http.get<void>(`${environment.apiBaseUrl}/api/Invoice/${id}`);
  }

}
