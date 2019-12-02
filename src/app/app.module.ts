import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule , RoutingComponent} from './app-routing.module'; 
import {MaterialModule} from './material/material.module';
import { from } from 'rxjs';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { PotagerComponent } from './potager/potager.component';
import { NewUserComponent } from './new-user/new-user.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule} from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule}from 'ngx-toastr';

import {FirebaseService} from '../services/firebase.service';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { DialogService } from '../services/dialog.service';
import { AddSerresComponent } from './add-serres/add-serres.component';
import { EditSerreComponent } from './edit-serre/edit-serre.component';
import { EditPotagerComponent } from './edit-potager/edit-potager.component';
import { EditPotagerResolver } from './edit-potager/edit-potager.resolver';
import { EditSerreResolver } from './edit-serre/edit-serre.resolver';
import { SerreComponent } from './serre/serre.component';
import { NewPotagerComponent } from './new-potager/new-potager.component';
import { BreadcrumbComponent} from './breadcrumb/breadcrumb.component'



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
  
    RoutingComponent,
    NewUserComponent,
   
    HomeComponent,
    EditUserComponent,
    PotagerComponent,
    MatConfirmDialogComponent,
    AddSerresComponent,
    EditSerreComponent,
    EditPotagerComponent,
    SerreComponent,
    NewPotagerComponent,
    BreadcrumbComponent
    
   
   
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
    timeOut:1000,
    positionClass:'toast-bottom-right',
    preventDuplicates:false,
    }),
    NoopAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
   
  
  ],
 
  providers: [FirebaseService,EditUserResolver,DialogService,EditPotagerResolver,EditSerreResolver],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  
  entryComponents:[NewUserComponent,MatConfirmDialogComponent,EditUserComponent]
})
export class AppModule { }
