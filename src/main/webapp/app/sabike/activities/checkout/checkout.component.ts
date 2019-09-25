import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, AccountService } from 'app/core';
import { ClientService } from 'app/entities/client';
import { IClient } from 'app/shared/model/client.model';
import { AddressService } from 'app/entities/address';
import { Address } from 'app/shared/model/address.model';
import { CommandService } from 'app/entities/command';
import { OrderState } from 'app/shared/model/command.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  nameFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  paymentFormGroup: FormGroup;

  private client: IClient;
  private account: Account;
  private address: Address;

  totalPrice: number;
  numberOfItems: number;

  constructor(
    private _formBuilder: FormBuilder,
    private accountService: AccountService,
    private clientService: ClientService,
    private addressService: AddressService,
    private commandService: CommandService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //
  }

  ngOnInit() {
    this.totalPrice = 0.0;
    this.numberOfItems = 0;
    this.commandService.getCart.orderItems.map(item => {
      this.totalPrice += item.paidPrice;
      this.numberOfItems += item.quantity;
    });

    // load account data, we must be logged in to enter checkout anyways
    this.loadCurrentAccountInformations();

    ///////////////////////////////////
    // Validators
    // first step validation : first and last name
    this.nameFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
    // second step validation : address fields
    this.addressFormGroup = this._formBuilder.group({
      addressNumberCtrl: ['', [Validators.required, Validators.pattern('^\\d{1,5}$')]],
      addressStreetCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      addressPostalCodeCtrl: ['', [Validators.required, Validators.pattern('^\\d{5}$')]],
      addressCityCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    });
    // third step validation : address fields
    this.paymentFormGroup = this._formBuilder.group({
      paymentCardNumberCtrl: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      paymentCardNameCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      paymentCardExpirationCtrl: ['', [Validators.required, Validators.pattern('^\\d{2}\\/\\d{2}$')]],
      paymentCardSecurityCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  private loadCurrentAccountInformations() {
    // Load account info
    this.accountService
      .identity()
      .then(account => {
        this.account = account;
        this.nameFormGroup.get('firstCtrl').setValue(this.account.firstName);
        this.nameFormGroup.get('lastCtrl').setValue(this.account.lastName);
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
          this.addressFormGroup.get('addressNumberCtrl').setValue(this.address.deliveryNumber);
          this.addressFormGroup.get('addressStreetCtrl').setValue(this.address.deliveryStreet);
          this.addressFormGroup.get('addressPostalCodeCtrl').setValue(this.address.deliveryPostalCode);
          this.addressFormGroup.get('addressCityCtrl').setValue(this.address.deliveryCity);
        }
      })
      .catch(error => console.log(error));
  }

  validate() {
    if (this.nameFormGroup.valid && this.addressFormGroup.valid && this.paymentFormGroup.valid) {
      // we can validate transaction !!
      this.commandService
        .hasCartAsPromise(this.accountService.userIdentityId)
        .then(remoteCart => {
          remoteCart.body[0].state = OrderState.PENDING;
          this.commandService
            .update(remoteCart.body[0])
            .toPromise()
            .then(updatedCart => {
              if (updatedCart.body.state === OrderState.PENDING) {
                this.router.navigate(['/checkout/success'], { relativeTo: this.route }).then(r => {
                  console.log('++++++++++++++++++++++++ we should empty badge cart', r);
                  this.commandService.emptyCart();
                });
              }
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

      // this.commandService.getCart.state = OrderState.PENDING;
      // this.commandService
      //   .update(this.commandService.getCart)
      //   .toPromise()
      //   .then(updatedCart => {
      //     console.log('++++++++++++++++++++++++', updatedCart);
      //     if (updatedCart.body.state === OrderState.PENDING) {
      //       this.router
      //         .navigate(['/checkout/success'], {relativeTo: this.route})
      //         .then(r => {
      //           console.log('++++++++++++++++++++++++ we should empty badge cart', r);
      //         });
      //     }
      //   })
      //   .catch(error => console.log(error));
    }
  }

  validForms(): boolean {
    return this.nameFormGroup.valid && this.addressFormGroup.valid && this.paymentFormGroup.valid;
  }
}
