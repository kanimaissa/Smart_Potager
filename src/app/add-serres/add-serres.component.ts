import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import {ToastrService} from 'ngx-toastr';

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
    'lib': [
      { type: 'required', message: 'libille is required.' }
    ],
    'position': [
      { type: 'required', message: 'position is required.' }
    ],
    'largeur': [
      { type: 'required', message: 'largeur is required.' },
    ],
    'longueur': [
      { type: 'required', message: 'longeur is required.' },
    ],
    'culture': [
      { type: 'required', message: 'culture is required.' },
    ]
   
   
  };


  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public route: ActivatedRoute,
    public firebaseService: FirebaseService,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.idPotager = this.route.snapshot.paramMap.get('id');
    this.createForm();
    
  }

  createForm() {
    this.exampleForm = this.fb.group({
      lib: ['', Validators.required ],
      position: ['', Validators.required ],
      largeur:  ['', Validators.required ],
      longueur:  ['', Validators.required ],
      culture:  ['', Validators.required ]
    });
  }

  resetFields(){
   
    this.exampleForm = this.fb.group({
      lib: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      largeur: new FormControl('', Validators.required),
      longueur: new FormControl('', Validators.required),
      culture: new FormControl('', Validators.required)
     
    });
   
  }

  showSuccess(){
    this.toastr.success('lajout a effectué avec succées');
  }
  
 

  addSerres(valueSerre){
    this.firebaseService.addSerre(this.idPotager, valueSerre).then(
      res =>{
       
        this.router.navigate(['/serres/'+ this.idPotager]);
        this.resetFields();
        this.showSuccess();
      }
    )
  }


  

}
