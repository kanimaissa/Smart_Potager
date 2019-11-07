import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
@Component({
  selector: 'app-compte-user',
  templateUrl: './compte-user.component.html',
  styleUrls: ['./compte-user.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class CompteUserComponent implements OnInit {
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;
  nameToSearch:string;
  constructor(private crudService: UserService,private _formBuilder: FormBuilder) { }
 
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nom_prenomCtrl: ['', Validators.required],
      telephoneCtrl: ['', Validators.required, Validators.minLength(8)],
      adresseCtrl: ['', Validators.email]
    });


    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
   
  }
  
 
  CreateRecord() {
    let record = {};
    record['Name'] = this.studentName;
    record['Age'] = this.studentAge;
    record['Address'] = this.studentAddress;
    record['nameToSearch']=this.studentName.toLowerCase(),
    this.crudService.create_NewStudent(record).then(resp => {
      this.studentName = "";
      this.studentAge = undefined;
      this.studentAddress = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
 
 

  
}
