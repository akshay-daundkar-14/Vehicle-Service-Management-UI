import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GetScheduledVehicles } from '../models/get-scheduled-vehicle-response.model';
import { GetVehicleResponse } from '../../admin/vehicle/models/get-vehicle-response.model';
import { AddServiceRecord } from '../models/add-service-record-model';
import { AddServiceRecordItem } from '../models/add-service-record-item-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceAdvisorService {

  $getScheduledVehicles = new BehaviorSubject<GetVehicleResponse[] | undefined>(undefined); 

  constructor(private http:HttpClient) { }

  getScheduledVehicles(id:number):Observable<GetScheduledVehicles[]>{
    return this.http.get<GetScheduledVehicles[]>(`${environment.apiBaseUrl}/api/ScheduledServices/${id}`);
  }

  vehicles():Observable<GetVehicleResponse[] | undefined>{
    return this.$getScheduledVehicles.asObservable();
  }

  setScheduledVehicles(scheduledVehicle:GetVehicleResponse){
    let vehicles : GetVehicleResponse[] = [];
    vehicles.push(scheduledVehicle);
    this.$getScheduledVehicles.next(vehicles);
  }

  addServiceRecord(addServiceRecord : AddServiceRecord):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/ServiceRecords`,addServiceRecord);
  }

  addServiceRecordItem(addServiceRecordItem : AddServiceRecordItem):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/ServiceRecordItems`,addServiceRecordItem);
  }

}
