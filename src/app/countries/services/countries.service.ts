import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: string[] = ['Africa','Americas','Asia','Europe','Oceania'];

  constructor() { }

  get regions(): string[] {
    return [ ...this._regions ];
  }
  
}
