import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import {ToastrService} from 'ngx-toastr';
import * as $ from 'jquery' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
  exampleForm2: FormGroup;
  idPotager: string ;
  idUser: string ; 
  
  hide = true;
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'email': [
      { type: 'required', message: 'Not a valid email.' }
    ],
    'ville': [
      { type: 'required', message: 'Ville is required.' },
    ],
    'adresse': [
      { type: 'required', message: 'Ville is required.' },
    ],
    'telephone': [
     { type: 'required', message: 'Telephone is required.' }
   ],
   'mdp': [
     { type: 'required', message: 'mdp is required.' }
   ],
   'nbr_potager': [
    { type: 'required', message: 'mdp is required.' }
  ]
  };



  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService,
    public dialogRef: MatDialogRef<NewUserComponent>,
    private toastr:ToastrService
    
  
  ) { }

  ngOnInit() {
    this.createForm();
   
  }
 


  closeDialog(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.exampleForm = this.fb.group({
   
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      email: ['', Validators.required],
      ville: ['', Validators.required ],
      adresse: ['', Validators.required ],
      telephone: ['', Validators.required ],
      mdp: ['', Validators.required ],
      nbr_potager: ['', Validators.required ]
    });

  }

  createForm2() {
    this.exampleForm2 = this.fb2.group({
      namePotager: ['', Validators.required ],
      description: ['', Validators.required ],
      surface: ['', Validators.required ],
      orientation: ['', Validators.required ],
      localisation: ['', Validators.required ]
    });
  }

 

  resetFields(){
   
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      mdp: new FormControl('', Validators.required),
      nbr_potager: new FormControl('', Validators.required)
    });

    this.exampleForm2 = this.fb2.group({
      namePotager: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      orientation: new FormControl('', Validators.required),
      surface: new FormControl('', Validators.required),
      localisation: new FormControl('', Validators.required),
    });
 
  }

  showSuccess(){
    this.toastr.success('lajout a effectué avec succées','utilisateur ajouté');
  }
  onSubmit(value){
    this.firebaseService.createUser(value)
    .then(
      res => {
        this.resetFields();
        this.closeDialog();
        this.showSuccess();
      }
    )
  }

  createPotager(valuePotager){
    this.firebaseService.createPotager(valuePotager, this.idUser).then(
      res => {
        this.resetFields();
        res.onSnapshot(doc => {
          this.idPotager = doc.id ;
         // console.log(doc.id, '=>', doc.data());
        // console.log(`${doc.id} => ${doc.data()}`);
         console.log(this.idUser);
         this.firebaseService.potagerUser(this.idPotager, this.idUser);
       
        // this.router.navigate(['/home']);
      }
    );
      });
    
    // this.firebaseService.getIdPotager().subscribe((snapshot) =>{
    //   snapshot.forEach(doc => {
    //     console.log(doc.id, '=>', doc.data());
    //   });
     
  
     //console.log(this.idPotager);
  }

}
  



export interface DialogData {
 
  name: string;
}
