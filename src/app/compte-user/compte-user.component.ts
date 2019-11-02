import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-compte-user',
  templateUrl: './compte-user.component.html',
  styleUrls: ['./compte-user.component.scss']
})
export class CompteUserComponent implements OnInit {
  
 
  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;
 
  constructor(private crudService: UserService) { }
 
  ngOnInit() {
   
  }
 
  CreateRecord() {
    let record = {};
    record['Name'] = this.studentName;
    record['Age'] = this.studentAge;
    record['Address'] = this.studentAddress;
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
