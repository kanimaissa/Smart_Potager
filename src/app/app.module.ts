import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule , RoutingComponent} from './app-routing.module'; 
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompteUserComponent } from './compte-user/compte-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {UserService} from '../app/user.service';
import { FormsModule } from "@angular/forms";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatIconModule} from '@angular/material'; 
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    CompteUserComponent,
    ListUserComponent,
    RoutingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    AngularFireDatabaseModule,
    MatStepperModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatIconModule
   
  ],
  providers: [UserService],
  bootstrap: [AppComponent]

  
})
export class AppModule { }
