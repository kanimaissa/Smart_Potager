import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-add-serres',
  templateUrl: './add-serres.component.html',
  styleUrls: ['./add-serres.component.scss']
})
export class AddSerresComponent implements OnInit {

  exampleForm: FormGroup;
  exampleForm2: FormGroup ;
  idPotager: string ;
  idUser: string ; 
  cultures : any;

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
    { type: 'required', message: 'mdp is required.' }
  ]
  };


  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public route: ActivatedRoute,
    public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.idPotager = this.route.snapshot.paramMap.get('id');
    this.createForm();
    
  }

  createForm() {
    this.exampleForm = this.fb.group({
      lib: ['', Validators.required ],
      position: ['', Validators.required ],
      largeur:  ['', Validators.required ],
      longueur:  ['', Validators.required ]
    });
  }

  resetFields(){
   
    this.exampleForm = this.fb.group({
      lib: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      largeur: new FormControl('', Validators.required),
      longueur: new FormControl('', Validators.required)
     
    });
   
  }

  
  redirectTableSerre(){
    this.router.navigate(['/serres/'+ this.idPotager]);
  }

  addSerres(valueSerre){
    this.firebaseService.addSerre(this.idPotager, valueSerre).then(
      res =>{
        this.resetFields();
        this.router.navigate(['/serres/'+ this.idPotager]);
      }
    )
  }

}
