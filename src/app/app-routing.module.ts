import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { DashboardComponent} from './dashboard/dashboard.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeComponent } from './home/home.component';
import {ComposantComponent} from './composant/composant.component' ;
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { PotagerComponent} from './potager/potager.component';
import {SerreComponent} from './serre/serre.component';
import {AddSerresComponent} from './add-serres/add-serres.component'
import {NewPotagerComponent} from './new-potager/new-potager.component';
import {EditPotagerComponent} from './edit-potager/edit-potager.component'
import {EditPotagerResolver} from './edit-potager/edit-potager.resolver'
import {EditSerreResolver} from'./edit-serre/edit-serre.resolver' ;
import {EditSerreComponent} from'./edit-serre/edit-serre.component' ;
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:"dashboard", component:DashboardComponent}, 
  { path: 'new-user', component: NewUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'composant/:id', component: ComposantComponent },
  { path: 'details/:id', component: EditUserComponent, resolve:{data : EditUserResolver}},
  { path: 'potagers/:id', component: PotagerComponent  },
  { path: 'serres/:id', component: SerreComponent  },
  { path: 'add-serres/:id', component: AddSerresComponent  },
  { path: 'new-potager/:id', component: NewPotagerComponent  },
  { path: 'edit-potager/:id', component: EditPotagerComponent, resolve:{data: EditPotagerResolver}  },
  { path: 'edit-serre/:id', component: EditSerreComponent, resolve:{data: EditSerreResolver}  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
export const 
RoutingComponent = [DashboardComponent,HomeComponent,NewUserComponent, EditUserComponent,PotagerComponent,SerreComponent,AddSerresComponent,NewPotagerComponent,EditPotagerComponent,EditSerreComponent];

