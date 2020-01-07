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

  exampleForm: FormGroup ;


  
  idPotager: any ;
  idUser: any ;
  userId: any ;

  orientations = [
    { value: 'NORD' },
    { value: 'NORD_EST' },
    { value: 'EST' },
    { value: 'SUD_EST' },
    { value: 'SUD' },
    { value: 'SUD_OUEST' },
    { value: 'OUEST' },
    { value: 'NORD_OUEST' },
  ];

  validation_messages = {
    'namePotager': [
      { type: 'required', message: 'Name is required.' }
    ],
    'description': [
      { type: 'required', message: 'description is required.' }
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
    this.createForm();
  }

 
 
  createForm() {
    this.exampleForm = this.fb2.group({
      namePotager: ['', Validators.required ],
      description: ['', Validators.required ],
      surface: ['', Validators.required ],
      orientation: ['0', Validators.required ],
      localisation: ['', Validators.required ]
    });
  }

  showSuccess(){
    this.toastr.success('potager a ete ajouté avec succées');
  }
  resetFields(){
    this.exampleForm= this.fb2.group({
      namePotager: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      orientation: new FormControl('0', Validators.required),
      surface: new FormControl('', Validators.required),
      localisation: new FormControl('', Validators.required),
    });
  }

  addPotager(valuePotager){
    this.firebaseService.createPotager(valuePotager, this.userId).then(
      res => {
       
        res.onSnapshot(doc => {
          this.idPotager = doc.id ;
         // console.log(doc.id, '=>', doc.data());
        // console.log(`${doc.id} => ${doc.data()}`);
         console.log(this.userId);
         this.firebaseService.potagerUser(this.idPotager, this.userId);
         this.resetFields();
         this.router.navigate(['/potagers/'+ this.userId]);
         this.showSuccess();
      }
    );
      });
  }




}

