import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

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
  ],
  'nbr_potager': [
    { type: 'required', message: 'nombre  potager is required.' }
  ]
 };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      surname: [this.item.surname, Validators.required],
      ville: [this.item.ville, Validators.required],
      telephone: [this.item.telephone, Validators.required],
      mdp: [this.item.mdp, Validators.required],
      nbr_potager: [this.item.nbr_potager, Validators.required]
    });
  }



  onSubmit(value){
    value.ville = this.item.ville;
    value.telephone = Number(value.telephone);
    value.mdp = this.item.mdp;
    value.nbr_potager = Number(value.nbr_potager);
    this.firebaseService.updateUser(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    )
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
    .then(
      res => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
