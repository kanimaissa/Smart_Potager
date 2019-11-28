import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-new-potager',
  templateUrl: './new-potager.component.html',
  styleUrls: ['./new-potager.component.scss']
})
export class NewPotagerComponent implements OnInit {

  exampleForm2: FormGroup ;
  idPotager: any ;
  idUser: any ;
  userId: any ;

  validation_messages2 = {
    'namePotager': [
      { type: 'required', message: 'Name is required.' }
    ],
    'libPotager': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'surface': [
      { type: 'required', message: 'Surface is required.' },
    ],
    'orientation': [
      { type: 'required', message: 'Orientation is required.' },
    ],
    'localisation': [
      { type: 'required', message: 'Localisation is required.' },
    ],
  };


  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService,
    public route: ActivatedRoute ,
    
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.createForm2();
  }

  
 
  createForm2() {
    this.exampleForm2 = this.fb2.group({
      namePotager: ['', Validators.required ],
      lib: ['', Validators.required ],
      surface: ['', Validators.required ],
      orientation: ['', Validators.required ],
      localisation: ['', Validators.required ]
    });
  }

  resetFields(){
    this.exampleForm2 = this.fb2.group({
      namePotager: new FormControl('', Validators.required),
      lib: new FormControl('', Validators.required),
      orientation: new FormControl('', Validators.required),
      surface: new FormControl('', Validators.required),
      localisation: new FormControl('', Validators.required),
    });
  }

  addPotager(valuePotager){
    this.firebaseService.createPotager(valuePotager).then(
      res => {
        this.resetFields();
        res.onSnapshot(doc => {
          this.idPotager = doc.id ;
         // console.log(doc.id, '=>', doc.data());
        // console.log(`${doc.id} => ${doc.data()}`);
         console.log(this.userId);
         this.firebaseService.potagerUser(this.idPotager, this.userId);
         this.router.navigate(['/potagers/'+ this.userId]);
      
      }
    );
      });
  }



}

