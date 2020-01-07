import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import { FirebaseService } from '../../services/firebase.service';
import {DialogService} from '../../services/dialog.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;
  hide = true;
  villes = [
    { value: 'TUNIS' },{ value: 'ARIANA' },{ value: 'MANOUBA' },{ value: 'BEN AROUS' },{ value: 'BISERTE' },{ value: 'NABEUL' },{ value: 'ZAGHOUAN' },{ value: 'SILIANA' },
    { value: 'KEF' },{ value: 'JENDOUBA' },{ value: 'BEJA' },{ value: 'KIROUAN' },{ value: 'SOUSSE' },{ value: 'MOUNASTIR' },{ value: 'MAHDIA' },{ value: 'SFAX' },
    { value: 'MEDNINE' },{ value: 'GABES' },{ value: 'GAFSA' },{ value: 'GBELI' },{ value: 'GASSERINE' },{ value: 'TOUSEUR' },{ value: 'TATAOUINE' },{ value: 'TMEDNINE' },
  ];
  
  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'surname': [
     { type: 'required', message: 'Surname is required.' }
   ],
   'email': [
    { type: 'required', message: 'Email is required.' }
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
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private toastr:ToastrService,
    private dialogservice:DialogService,
  
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
      email: [this.item.email, Validators.required],
      ville: [this.item.ville, Validators.required],
      adresse: [this.item.adresse, Validators.required],
      telephone: [this.item.telephone, Validators.required],
      mdp: [this.item.mdp, Validators.required]
    
    });
  }

 
 
  onSubmit(value){
    value.email = this.item.email;
    value.ville = this.item.ville;
    value.adresse = this.item.adresse;
    value.telephone = Number(value.telephone);
    value.mdp = this.item.mdp;
  
    this.firebaseService.updateUser(this.item.id, value)
    .then(
      res => {
       
        this.router.navigate(['/home']);
        this.showWarn();
      }
    )
  }

  showWarn(){
    this.toastr.warning('la modification a effectué avec succées');
  }

  showError(){
    this.toastr.error('la suppression a effectué avec succées');
  }
  delete(){
    /*this.firebaseService.deleteUser(this.item.id)
    .then(
      res => {
      
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    )*/
    this.dialogservice.openConfirmDialog()
    .afterClosed().subscribe(res =>{
     if(res) {
      this.firebaseService.deleteUser(this.item.id);
      this.showError();
      this.router.navigate(['/home']);
     }
    });
  } 


  cancel(){
    this.router.navigate(['/home']);
  }

}