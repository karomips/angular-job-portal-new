import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countriesAPI = 'https://countriesnow.space/api/v0.1/'
  constructor(private httpClient:HttpClient) { }

  getAllCountries(){
    return this.httpClient.get(this.countriesAPI+'countries/iso')
  }


  getAllStates(payload: { country: string; }){
    return this.httpClient.post(this.countriesAPI+'countries/states',payload)
  }

  getAllCites(payload: { country: string,state:string}){
    return this.httpClient.post(this.countriesAPI+'countries/states/cities',payload)
  }
}
