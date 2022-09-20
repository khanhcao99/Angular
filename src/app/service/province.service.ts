import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Province} from "../model/province";
import {Country} from "../model/country";

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private httpClient: HttpClient) { }

  findAllProvinces(): Observable<Province[]>{
    return this.httpClient.get<Province[]>("http://localhost:8080/Provinces")
  }

  findAllCountries(): Observable<Country[]>{
    return this.httpClient.get<Country[]>("http://localhost:8080/Provinces/Countries")
  }

  createProvince(province?: Province): Observable<Province>{
    return this.httpClient.post<Province>("http://localhost:8080/Provinces", province)
  }

  getProvinceById(id?: number): Observable<Province>{
    return this.httpClient.get<Province>("http://localhost:8080/Provinces/" + id)
  }

  updateProvince(province?: Province): Observable<Province>{
    return this.httpClient.put<Province>("http://localhost:8080/Provinces", province)
  }

  deleteProvince(id?: number): Observable<Province>{
    return this.httpClient.delete("http://localhost:8080/Provinces/" + id)
  }
}
