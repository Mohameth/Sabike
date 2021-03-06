import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { activitiesRoute } from 'app/sabike/activities/activities.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...activitiesRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: () => import('./admin/admin.module').then(m => m.SabikeAdminModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: false }
    )
  ],
  exports: [RouterModule]
})
export class SabikeAppRoutingModule {}
