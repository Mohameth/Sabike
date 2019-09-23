import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/entities/client';
import { AccountService, User } from 'app/core';
import { Client, IClient } from 'app/shared/model/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  private client: IClient = new Client(0, '000000', [], [], new User());

  clientFormGroup: FormGroup;
  addressFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private accountService: AccountService, private clientService: ClientService) {
    //
  }

  ngOnInit() {
    this.clientService
      .find(this.accountService.userIdentityId)
      .toPromise()
      .then(client => {
        // loaded
        this.client = client.body;
        console.log('++++++++++++++++++++++++', this.client);
        // loaded address
      })
      .catch(error => console.log(error));

    ///////////////////////////////////
    // Validators
    // first step validation : first and last name
    this.clientFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required, Validators.minLength(4), Validators.maxLength(20)],
      lastCtrl: ['', Validators.required, Validators.minLength(4), Validators.maxLength(20)]
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
}
