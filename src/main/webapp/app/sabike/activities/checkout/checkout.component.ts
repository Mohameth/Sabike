import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, AccountService } from 'app/core';
import { ClientService } from 'app/entities/client';
import { IClient } from 'app/shared/model/client.model';
import { AddressService } from 'app/entities/address';
import { Address } from 'app/shared/model/address.model';

@Component({
  selector: 'jhi-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  private client: IClient;
  private account: Account;
  private address: Address;

  constructor(
    private _formBuilder: FormBuilder,
    private accountService: AccountService,
    private clientService: ClientService,
    private addressService: AddressService
  ) {
    //
  }

  ngOnInit() {
    // load account data, we must be logged in to enter checkout anyways
    this.loadCurrentAccountInformations();

    ///////////////////////////////////
    // Validators
    // first step validation : first and last name
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required], // TODO
      lastCtrl: ['', Validators.required] // TODO
    });
    // second step validation : address fields
    this.secondFormGroup = this._formBuilder.group({
      addressNumberCtrl: ['', Validators.required], // TODO
      addressStreetCtrl: ['', Validators.required], // TODO
      addressPostalCodeCtrl: ['', Validators.required], // TODO
      addressCityCtrl: ['', Validators.required] // TODO
    });
    // third step validation : address fields
    this.thirdFormGroup = this._formBuilder.group({
      paymentCardNumberCtrl: ['', Validators.required], // TODO
      paymentCardNameCtrl: ['', Validators.required], // TODO
      paymentCardExpirationCtrl: ['', Validators.required], // TODO
      paymentCardSecurityCtrl: ['', Validators.required] // TODO
    });
  }

  private loadCurrentAccountInformations() {
    // Load account info
    this.accountService
      .identity()
      .then(account => {
        this.account = account;
        this.firstFormGroup.get('firstCtrl').setValue(this.account.firstName);
        this.firstFormGroup.get('lastCtrl').setValue(this.account.lastName);
      })
      .catch(error => console.log(error));

    // Load client info
    this.clientService
      .find(this.accountService.userIdentityId)
      .toPromise()
      .then(client => {
        // loaded
        this.client = client.body;
        console.log(this.client);
        // loaded address
      })
      .catch(error => console.log(error));

    // Load address info
    this.addressService
      .findByClient(this.accountService.userIdentityId)
      .toPromise()
      .then(address => {
        this.address = address.body[0];
        if (this.address !== undefined) {
          this.secondFormGroup.get('addressNumberCtrl').setValue(this.address.deliveryNumber);
          this.secondFormGroup.get('addressStreetCtrl').setValue(this.address.deliveryStreet);
          this.secondFormGroup.get('addressPostalCodeCtrl').setValue(this.address.deliveryPostalCode);
          this.secondFormGroup.get('addressCityCtrl').setValue(this.address.deliveryCity);
        }
        console.log(this.address);
      })
      .catch(error => console.log(error));
  }
}
