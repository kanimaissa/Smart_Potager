import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
 

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'ville': [
      { type: 'required', message: 'Ville is required.' },
    ],
    'telephone': [
     { type: 'required', message: 'Telephone is required.' }
   ],
   'mdp': [
     { type: 'required', message: 'mdp is required.' }
   ]
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      ville: ['', Validators.required ],
      telephone: ['', Validators.required ],
      mdp: ['', Validators.required ]
    });
  }

 

  resetFields(){
   
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      mdp: new FormControl('', Validators.required)
    });
  }

  onSubmit(value){
    this.firebaseService.createUser(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
