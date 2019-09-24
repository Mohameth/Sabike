import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/entities/client';
import { AccountService, Account, UserService, IUser } from 'app/core';
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

  private clientFormGroup: FormGroup;
  private addressFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private accountService: AccountService,
    private clientService: ClientService,
    private addressService: AddressService,
    private userService: UserService
  ) {
    //
  }

  ngOnInit() {
    this.accountService
      .identity()
      .then(account => {
        // we are logged in - safely load data
        if (account != null) {
          this.account = account;
          this.clientFormGroup.get('firstCtrl').setValue(this.account.firstName);
          this.clientFormGroup.get('lastCtrl').setValue(this.account.lastName);

          // Load client info
          this.clientService
            .find(this.accountService.userIdentityId)
            .toPromise()
            .then(client => {
              this.client = client.body;
              this.clientFormGroup.get('phoneCtrl').setValue(this.client.phoneNumber);
            })
            .catch(error => console.log(error));

          // Load address info
          this.addressService
            .findByClient(this.accountService.userIdentityId)
            .toPromise()
            .then(address => {
              this.address = address.body[0];
              if (this.address !== undefined) {
                this.addressFormGroup.get('addressNumberCtrl').setValue(this.address.deliveryNumber);
                this.addressFormGroup.get('addressStreetCtrl').setValue(this.address.deliveryStreet);
                this.addressFormGroup.get('addressPostalCodeCtrl').setValue(this.address.deliveryPostalCode);
                this.addressFormGroup.get('addressCityCtrl').setValue(this.address.deliveryCity);
              }
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));

    ///////////////////////////////////
    // Validators
    this.clientFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      lastCtrl: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      phoneCtrl: ['', [Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.addressFormGroup = this._formBuilder.group({
      addressNumberCtrl: ['', [Validators.required, Validators.pattern('^\\d{1,5}$')]],
      addressStreetCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      addressPostalCodeCtrl: ['', [Validators.required, Validators.pattern('^\\d{5}$')]],
      addressCityCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    });
  }

  update() {
    // update first and last
    this.updateAccount();
    // update client
    this.updateClient();
    // update address
    this.updateAddress();
  }

  private updateAccount() {
    this.userService
      .find(this.account.login)
      .toPromise()
      .then(user => {
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++', user);
        user.body.firstName = this.clientFormGroup.get('firstCtrl').value;
        user.body.lastName = this.clientFormGroup.get('lastCtrl').value;
        this.updateUser(user.body);
      });
  }

  private updateClient() {
    this.client.phoneNumber = this.clientFormGroup.get('phoneCtrl').value.toString();
    console.log('++++++ updateClient', this.client);
    this.clientService
      .update(this.client)
      .toPromise()
      .then(updatedClient => console.log(updatedClient));
  }

  private updateAddress() {
    this.address.deliveryNumber = this.addressFormGroup.get('addressNumberCtrl').value;
    this.address.deliveryStreet = this.addressFormGroup.get('addressStreetCtrl').value;
    this.address.deliveryStreet = this.addressFormGroup.get('addressPostalCodeCtrl').value;
    this.address.deliveryCity = this.addressFormGroup.get('addressCityCtrl').value;
    console.log('++++++ updateAddress', this.address);
    this.addressService
      .update(this.address)
      .toPromise()
      .then(updatedAddress => console.log(updatedAddress));
  }

  private updateUser(user: IUser) {
    console.log('++++++ updateUser', user);
    this.userService
      .update(user)
      .toPromise()
      .then(updatedUser => console.log(updatedUser));
  }
}
