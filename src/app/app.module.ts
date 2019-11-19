import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule , RoutingComponent} from './app-routing.module'; 
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule} from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { from } from 'rxjs';
import { NewUserComponent } from './new-user/new-user.component';

import {FirebaseService} from '../services/firebase.service';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { PotagerComponent } from './potager/potager.component';

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
    PotagerComponent
   
   
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
 
  providers: [FirebaseService,EditUserResolver],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
  
})
export class AppModule { }
