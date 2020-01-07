import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.scss']
})
export class CultureComponent implements OnInit {
  exampleForm: FormGroup;

 idPotager: string ;
  idSerre: string ; 
  

  validation_messages = {
    'libelle': [
      { type: 'required', message: 'libele is required.' }
    ],

   'periode': [
    { type: 'required', message: 'periode is required.' }
  ]
  };

  constructor( private fb: FormBuilder,
    private fb2: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public route: ActivatedRoute,
    public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.idSerre = this.route.snapshot.paramMap.get('idserre');
    this.idPotager = this.route.snapshot.paramMap.get('idpotager');
    this.createForm();
  }
  createForm() {
    this.exampleForm = this.fb.group({
      libelle: ['', Validators.required ],
      periode: ['', Validators.required ]
      
    });
  }
  resetFields(){
   
    this.exampleForm = this.fb.group({
      libelle: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
     
     
    });
   
  }
  addCulture(valueCulture){
    this.firebaseService.addCulture(this.idPotager,this.idSerre ,valueCulture).then(
      res =>{
        this.resetFields();
        console.log("nouvelle culture ajoutée");
      }
    )
  }
}
