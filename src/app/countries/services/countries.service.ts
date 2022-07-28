import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SmallCountry } from '../interfaces/region.interface';



@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _baseUrl = environment.RESTCOUNTRIES_BASE_API;
  private _regions: string[] = ['Africa','Americas','Asia','Europe','Oceania'];

  constructor(
    private _http: HttpClient
  ) { }

  get regions(): string[] {
    return [ ...this._regions ];
  }

  getCountriesByRegion( region: string ):Observable<SmallCountry[]> {
    return this._http.get<SmallCountry[]>(`${this._baseUrl}/region/${region}?fields=alpha3Code,name`)
  }

}
