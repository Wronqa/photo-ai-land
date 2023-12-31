import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './modules/timeline/timeline.component';
import { ProfileComponent } from './modules/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'timeline',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
