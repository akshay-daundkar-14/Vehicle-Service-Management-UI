import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { GetMaterialResponse } from '../models/get-material-response.model';
import { AddMaterialRequest } from '../models/add-material-request.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http:HttpClient) { }

  addMaterial(model:AddMaterialRequest):Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/materials`,model);
  }

  getMaterials():Observable<GetMaterialResponse[]>{
    return this.http.get<GetMaterialResponse[]>(`${environment.apiBaseUrl}/api/materials`);
  }


  getMaterialById(id:number):Observable<GetMaterialResponse>{
    return this.http.get<GetMaterialResponse>(`${environment.apiBaseUrl}/api/materials/${id}`);
  }

  editMaterial(id:number,material:GetMaterialResponse | undefined):Observable<void>{
    return this.http.put<void>(`${environment.apiBaseUrl}/api/materials/${id}`,material);
  }

  deleteMaterial(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/materials/${id}`);
  }
}
