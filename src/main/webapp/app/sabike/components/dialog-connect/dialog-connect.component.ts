import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { JhiEventManager } from 'ng-jhipster';
import { LoginService, StateStorageService } from 'app/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface DialogData {
  username: string;
  password: string;
  rememberMe: boolean;
}

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
  _rememberMe: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogConnectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit() {
    console.log('++++++++');
    setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
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
    // console.log('++++++ login called', this._username, this._password);
    // todo rememberMe !!
    this.loginService
      .login({
        username: this._username,
        password: this._password,
        rememberMe: false
      })
      .then(() => {
        // console.log(1);
        this.authenticationError = false;
        this.activeModal.dismiss('login success');
        if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
          this.router.navigate(['']);
        }
        // console.log(2);
        this.eventManager.broadcast({
          name: 'authenticationSuccess',
          content: 'connected'
        });

        // console.log(3);

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
  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' : this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
