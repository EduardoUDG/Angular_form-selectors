import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

import { SmallCountry } from '../../interfaces/region.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  regions   : string[] = []
  countries : SmallCountry[] = [];

  myForm: FormGroup = this._fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]]
  });

  constructor(
    private _fb: FormBuilder,
    private _countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.regions = this._countriesService.regions;

    this.myForm.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.myForm.get('country')?.reset('');
        }),
        switchMap( region => this._countriesService.getCountriesByRegion(region))
      )
      .subscribe( countries => {
        this.countries = countries;
      })
  }

  submit() {
    console.log( this.myForm.value );
  }

}
