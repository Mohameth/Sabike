import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { JhiEventManager } from 'ng-jhipster';
import { AccountService, LoginService, StateStorageService } from 'app/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandService } from 'app/entities/command';
import { OrderState } from 'app/shared/model/command.model';
import { ClientService } from 'app/entities/client';

@Component({
  selector: 'jhi-dialog-connect',
  templateUrl: './dialog-connect.component.html',
  styleUrls: ['./dialog-connect.component.scss']
})
export class DialogConnectComponent implements AfterViewInit {
  authenticationError: boolean;

  email = new FormControl('', [Validators.required, Validators.email]);

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false]
  });

  _username: string;
  _password: string;
  hide = true;
  private toCheckout: boolean;

  @ViewChild('username', { static: false }) usernameField: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DialogConnectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private commandService: CommandService,
    private accountService: AccountService,
    private clientService: ClientService
  ) {
    //
  }

  ngAfterViewInit(): void {
    this.usernameField.nativeElement.focus();
  }

  cancel() {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
    this.activeModal.dismiss('cancel');
  }

  login() {
    this.loginService
      .login({
        username: this._username,
        password: this._password,
        rememberMe: false
      })
      .then(() => {
        this.authenticationError = false;
        this.activeModal.dismiss('login success');

        if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
          this.router.navigate(['']);
        }

        this.eventManager.broadcast({
          name: 'authenticationSuccess',
          content: 'connected'
        });

        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // since login is successful, go to stored previousState and clear previousState
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigateByUrl(redirect);
        }
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

  register() {
    this.activeModal.dismiss('to state register');
    this.router.navigate(['/register']);
  }

  requestResetPassword() {
    this.activeModal.dismiss('to state requestReset');
    this.router.navigate(['/reset', 'request']);
  }

  // SABIKE
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' : this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
