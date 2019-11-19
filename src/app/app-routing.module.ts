import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { DashboardComponent} from './dashboard/dashboard.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { PotagerComponent} from './potager/potager.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:"dashboard", component:DashboardComponent}, 
  { path: 'new-user', component: NewUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'details/:id', component: EditUserComponent, resolve:{data : EditUserResolver}},
  { path: 'potagers/:id', component: PotagerComponent  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
export const 
RoutingComponent = [DashboardComponent,HomeComponent,NewUserComponent, EditUserComponent,PotagerComponent];

