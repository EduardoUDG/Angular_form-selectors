import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this._fb.group({
    region: ['', [Validators.required]]
  });

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  submit() {
    console.log( this.myForm.value );
  }

}
