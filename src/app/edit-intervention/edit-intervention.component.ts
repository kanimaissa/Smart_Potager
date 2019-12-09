import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { FirebaseService } from '../../services/firebase.service';
import {InterventionService} from '../../services/intervention.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-edit-intervention',
  templateUrl: './edit-intervention.component.html',
  styleUrls: ['./edit-intervention.component.scss']
})
export class EditInterventionComponent implements OnInit {

  exampleForm: FormGroup ;
  intervId : any ;
  item : any ;
 
  constructor
  (
    private fb2: FormBuilder,
    public dialog: MatDialog,
    public interventionService: InterventionService,
    public firebaseService: FirebaseService,
     public route: ActivatedRoute ,
     private router: Router) { }

  ngOnInit() {
    this.intervId = this.route.snapshot.paramMap.get('id');
    //this.createForm2();
    this.route.data.subscribe(routeData => {
     // console.log('data:: '+routeData['data']);
      let data = routeData['data'];
      if (data) {
        
        this.item = data.data();
        
        //this.item.id = data.payload.id;
        console.log('data:: '+this.item.description);
        this.createForm();
      }
    })
    
  }

  
  createForm() {
    
    this.exampleForm = 
    this.fb2.group({
      
      description: ['this.item.description', Validators.required ],
      dateDebutInterv: ['this.item.dateDebut', Validators.required ],
      timeInterv: ['this.item.time', Validators.required ],
      dateFinInterv: ['this.item.dateFin', Validators.required ],
  
    })
  
     
  }
  editerIntervention(value){
    console.log("vvvv"+value.description +" "+ value.dateDebutInterv+ " "+ value.dateFinInterv+" "+value.timeInterv)
    this.interventionService.editIntervention(value, this.intervId)
  }

}
