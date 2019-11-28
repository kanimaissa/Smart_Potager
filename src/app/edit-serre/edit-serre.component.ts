import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {Location} from '@angular/common';

import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-serre',
  templateUrl: './edit-serre.component.html',
  styleUrls: ['./edit-serre.component.scss']
})
export class EditSerreComponent implements OnInit {

  exampleForm2: FormGroup ;
 
  idUser: any ;
  serreId ;
  item :any  ;
  dataPotager: Array<any>= [] ;
  previousRoute: string;

  validation_messages2 = {
    'libSerre': [
      { type: 'required', message: 'Name is required.' }
    ],
    'position': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'largeur': [
      { type: 'required', message: 'Surface is required.' },
    ],
    'longueur': [
      { type: 'required', message: 'Orientation is required.' },
    ]
    
  };

  constructor(
   // private routingState: RoutingState,
    private fb2: FormBuilder,
    public dialog: MatDialog,
    private _location: Location,
    public firebaseService: FirebaseService,
     public route: ActivatedRoute ,
     private router: Router
  ) { }

  ngOnInit() {

    this.serreId = this.route.snapshot.paramMap.get('id');
    console.log('this.serreid: '+ this.serreId)
    //this.createForm2();
    this.route.data.subscribe(routeData => {
     //console.log('data:: '+routeData['data']);
      let data = routeData['data'];
      if (data) {
        
        this.item = data.data();
        
        //this.item.id = data.payload.id;
       // console.log('itemmm: '+ this.item.position)
        this.createForm2();
      }
    })
    
  }

  createForm2() {
   
    console.log('data:: '+this.item.libelle_serre);
    this.exampleForm2 = 
    this.fb2.group({
      
      libSerre: [this.item.libelle_serre, Validators.required ],
      position: [this.item.position, Validators.required ],
      largeur: [this.item.largeur, Validators.required ],
      longueur: [this.item.longueur, Validators.required ],
     
   
  
    })
  
     
  }

  resetFields(){
   
    
    this.exampleForm2 = this.fb2.group({
      libSerre: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      largeur: new FormControl('', Validators.required),
      longueur: new FormControl('', Validators.required),
     
    });
  }
  editSerre(value){
    
    this.firebaseService.getAllPotagers()
  .subscribe(result => {
   
  result.forEach(doc =>{
    

    this.firebaseService.updateSerre(value,doc.payload.doc.id,this.serreId).then(
      res => {
        //console.log('resssss: '+ doc.payload.doc.id + 'serre: '+this.serreId)
        this.resetFields();
     //  console.log(this._location.getState()) ;
     
     //  this.router.navigate(['/serres/'+ this.serreId]);
      }
    );
    
    console.log('updated item '+doc.payload.doc.id)
   }
   );
   
  })
   
    // this.firebaseService.getAllPotagers().subscribe(element=>{
    //     element.forEach(doc=>{
    //       console.log('resssss: '+doc.payload.doc.id)
    //       this.firebaseService.updateSerre(value,doc.payload.doc.id,this.serreId).then(
    //   res => {
        
    //     this.resetFields();
    //     this.router.navigate(['/serres/'+ this.serreId]);
    //   }
    // );
    //     })
    // })
    
     
  }

}
