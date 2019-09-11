import { Route } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { ToolbarComponent } from 'app/layouts/toolbar/toolbar.component';

export const navbarRoute: Route = {
  path: '',
  component: ToolbarComponent,
  outlet: 'toolbar'
};
