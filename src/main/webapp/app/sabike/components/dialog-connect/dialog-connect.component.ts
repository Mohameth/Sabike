import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class DialogConnectComponent {
  authenticationError: boolean = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false]
  });

  _username: string;
  _password: string;
  hide = true;
  @ViewChild('username', { static: false }) usernameField: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DialogConnectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private accountService: AccountService,
    private stateStorageService: StateStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    //
  }

  cancel() {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
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
        // this.activeModal.dismiss('login success');
        // this.activeModal.close('success');
        this.dialogRef.close();

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
}
