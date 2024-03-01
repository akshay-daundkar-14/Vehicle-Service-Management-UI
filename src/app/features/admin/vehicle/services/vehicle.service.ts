import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddVehicleRequest } from '../models/add-vehicle-request.model';
import { environment } from '../../../../../environments/environment';
import { GetVehicleResponse } from '../models/get-vehicle-response.model';
import { EditVehicleRequest } from '../models/edit-vehicle-request.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:HttpClient) { }

  addVehicle(model:AddVehicleRequest):Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/vehicles`,model);
  }

  getVehicles():Observable<GetVehicleResponse[]>{
    return this.http.get<GetVehicleResponse[]>(`${environment.apiBaseUrl}/api/vehicles`);
  }


  getVehicleById(id:number):Observable<GetVehicleResponse>{
    return this.http.get<GetVehicleResponse>(`${environment.apiBaseUrl}/api/vehicles/${id}`);
  }

  editVehicle(id:number,vehicle:EditVehicleRequest):Observable<void>{
    return this.http.put<void>(`${environment.apiBaseUrl}/api/vehicles/${id}`,vehicle);
  }

  deleteVehicle(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/vehicles/${id}`);
  }
}
