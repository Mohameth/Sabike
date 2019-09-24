import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/entities/client';
import { AccountService, Account } from 'app/core';
import { IClient } from 'app/shared/model/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address';

@Component({
  selector: 'jhi-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  private client: IClient;
  private account: Account;
  private address: Address;

  clientFormGroup: FormGroup;
  addressFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private accountService: AccountService,
    private clientService: ClientService,
    private addressService: AddressService
  ) {
    //
  }

  ngOnInit() {
    // Load account info
    this.accountService
      .identity()
      .then(account => {
        this.account = account;
        console.log(this.account);
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
        console.log(this.address);
      })
      .catch(error => console.log(error));

    ///////////////////////////////////
    // Validators
    // first step validation : first and last name
    this.clientFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      lastCtrl: ['', Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      phoneCtrl: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
    // second step validation : address fields
    this.addressFormGroup = this._formBuilder.group({
      addressNumberCtrl: ['', Validators.required],
      addressStreetCtrl: ['', Validators.required],
      addressPostalCodeCtrl: ['', Validators.required],
      addressCityCtrl: ['', Validators.required]
    });
  }

  updateName() {
    // TODO
  }

  updateAddress() {
    // TODO
  }

  update() {
    // TODO
  }
}
