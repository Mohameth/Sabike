import { Route } from '@angular/router';

import { RegisterComponent } from './register.component';
import { SabikeRegisterComponent } from 'app/sabike/activities/sabike-register/sabike-register.component';

export const registerRoute: Route = {
  path: 'register',
  component: SabikeRegisterComponent,
  data: {
    authorities: [],
    pageTitle: 'Registration'
  }
};
