import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    // Validators
    // first step validation : first and last name
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      lastCtrl: ['', Validators.required]
    });
    // second step validation : address fields
    this.secondFormGroup = this._formBuilder.group({
      addressNumberCtrl: ['', Validators.required],
      addressStreetCtrl: ['', Validators.required],
      addressPostalCodeCtrl: ['', Validators.required],
      addressCityCtrl: ['', Validators.required]
    });
    // third step validation : address fields
    this.thirdFormGroup = this._formBuilder.group({
      paymentCardNumberCtrl: ['', Validators.required],
      paymentCardNameCtrl: ['', Validators.required],
      paymentCardExpirationCtrl: ['', Validators.required],
      paymentCardSecurityCtrl: ['', Validators.required]
    });
  }
}
