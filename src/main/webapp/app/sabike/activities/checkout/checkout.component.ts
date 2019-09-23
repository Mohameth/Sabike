import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, AccountService } from 'app/core';
import { ClientService } from 'app/entities/client';
import { IClient } from 'app/shared/model/client.model';

@Component({
  selector: 'jhi-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  private account: Account;
  private client: IClient;

  constructor(private _formBuilder: FormBuilder, private accountService: AccountService, private clientService: ClientService) {
    //
  }

  ngOnInit() {
    // load account data, we must be logged in to enter checkout anyways
    if (this.accountService.isAuthenticated()) {
      // just in case
      // this.accountService
      //   .fetch()
      //   .toPromise()
      //   .then(account => {
      // set the account data - first/last ..
      // this.account = account.body;
      // load related address, it is inside client (sabike entity) that is linked to the account
      this.clientService
        .find(this.accountService.userIdentityId)
        .toPromise()
        .then(client => {
          // we got the client
          this.client = client.body;
          console.log('========+========+========+========+', client);
        })
        .catch(error => console.log(error));

      // });
      // .catch(error => console.log(error));
    }

    ///////////////////////////////////
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
