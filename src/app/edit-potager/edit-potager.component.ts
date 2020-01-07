import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-edit-potager',
  templateUrl: './edit-potager.component.html',
  styleUrls: ['./edit-potager.component.scss']
})
export class EditPotagerComponent implements OnInit {

  exampleForm: FormGroup ;
 
  idUser: any ;
  potagerId ;
  item :any  ;
  dataPotager: Array<any>= [] ;

  validation_messages = {
    'namePotager': [
      { type: 'required', message: 'Name Potager is required.' }
    ],
    'description': [
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
    
    private fb2: FormBuilder,
    public dialog: MatDialog,
    
    public firebaseService: FirebaseService,
     public route: ActivatedRoute ,
     private router: Router
  ) { }

  ngOnInit() {

    this.potagerId = this.route.snapshot.paramMap.get('id');
    //this.createForm2();
    this.route.data.subscribe(routeData => {
     // console.log('data:: '+routeData['data']);
      let data = routeData['data'];
      if (data) {
        
        this.item = data.data();
        
        //this.item.id = data.payload.id;
        this.createForm();
      }
    })
    
  }

  createForm() {
   
    console.log('data:: '+this.item.surface);
    this.exampleForm = 
    this.fb2.group({
      
      namePotager: [this.item.name, Validators.required ],
      description: [this.item.libelle, Validators.required ],
      surface: [this.item.surface, Validators.required ],
      orientation: [this.item.orientation, Validators.required ],
      localisation: [this.item.localisation, Validators.required ]
   
  
    })
  
     
  }

  resetFields(){
   
    
    this.exampleForm = this.fb2.group({
      namePotager: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      orientation: new FormControl('', Validators.required),
      surface: new FormControl('', Validators.required),
      localisation: new FormControl('', Validators.required),
    });
  }

  getData(){
    
    return this.firebaseService.getPotagerUser('CEcNH5sd0N2w7mjVzvsx')
    .subscribe(result => {
      return result.forEach(doc =>{
       // console.log("potager" + doc.payload.doc.data().potager);
       this.firebaseService.getPotagerwithID(doc.payload.doc.data().potager)
        .subscribe(
           res =>{
          
            this.item= res.data() ;
        }
        );
      }
      );
  })
  
}

  editPotager(value){
    // value.name = value.namePotager,
    //   value.libelle= value.lib,
    //   value.surface= value.surface,
    //  value.orientation= value.orientation,
    //   value.localisation= value.localisation

    // value.ville = this.item.ville;
    // value.telephone = Number(value.telephone);
    // value.mdp = this.item.mdp;
    // value.nbr_potager = Number(value.nbr_potager);
    this.firebaseService.updatePotager(value,this.potagerId).then(
      res => {
        this.resetFields();
       // this.router.navigate(['/potagers/'+ this.potagerId]);
      }
    );
     
  }
}
