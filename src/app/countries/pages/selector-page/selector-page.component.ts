import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  regions: string[] = []

  myForm: FormGroup = this._fb.group({
    region: ['', [Validators.required]]
  });

  constructor(
    private _fb: FormBuilder,
    private _countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.regions = this._countriesService.regions;
  }

  submit() {
    console.log( this.myForm.value );
  }

}
