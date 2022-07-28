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

  countries : SmallCountry[] = [];
  regions   : string[] = [];
  borders   : string[] = [];

  myForm: FormGroup = this._fb.group({
    region  : ['', [Validators.required]],
    country : ['', [Validators.required]],
    border  : ['', [Validators.required]]
  });


  constructor(
    private _fb: FormBuilder,
    private _countriesService: CountriesService
  ) { }


  ngOnInit(): void {
    this.regions = this._countriesService.regions;
    // region selected
    this.myForm.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.myForm.get('country')?.reset('');
        }),
        switchMap( region => this._countriesService.getCountriesByRegion(region))
      )
      .subscribe( countries => {
        this.countries = countries;
      });

    // region selected
    this.myForm.get('country')?.valueChanges
      .subscribe( alphaCode => {
        console.log( alphaCode );
      });

  }

  submit() {
    console.log( this.myForm.value );
  }

}
