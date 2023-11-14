import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDetailsComponent } from './components/edit-details/edit-details.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: 'user/:username',
    component: ProfileComponent,
    pathMatch: 'full',
  },

  {
    path: 'edit',
    component: EditDetailsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
