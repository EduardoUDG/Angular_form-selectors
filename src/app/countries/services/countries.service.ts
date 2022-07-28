import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { combineLatest, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SmallCountry } from '../interfaces/region.interface';
import { Country } from '../interfaces/country.interface';



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

  getCountriesByRegion( region:string ):Observable<SmallCountry[]> {
    return this._http.get<SmallCountry[]>(`${this._baseUrl}/region/${region}?fields=alpha3Code,name`)
  }

  getCountryByCode( alphaCode:string ): Observable<Country | null> {
    if( !alphaCode ) {
      return of(null);
    }
    return this._http.get<Country>(`${this._baseUrl}/alpha/${alphaCode}`)
  }

  getCountryBySmallCode( alphaCode:string ): Observable<SmallCountry> {
    return this._http.get<SmallCountry>(`${this._baseUrl}/alpha/${alphaCode}?fields=name,alpha3Code`)
  }

  getCountriesByCodes( borders: string[] ) {
    if( !borders ) {
      return of([]);
    }
    const requests: Observable<SmallCountry>[] = [];
    for (const code of borders) {
      const request = this.getCountryBySmallCode(code)
      requests.push(request);
    }
    return combineLatest( requests );
  }

}
