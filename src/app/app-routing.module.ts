import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { DashboardComponent} from './dashboard/dashboard.component';
import { CompteUserComponent} from './compte-user/compte-user.component';
import { ListUserComponent} from './list-user/list-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:"dashboard", component:DashboardComponent}, 
  {path:"compte", component:CompteUserComponent}, 
  {path:"list", component:ListUserComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
export const 
RoutingComponent = [DashboardComponent,CompteUserComponent,ListUserComponent];

