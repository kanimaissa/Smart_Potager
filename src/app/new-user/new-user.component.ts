import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import * as $ from 'jquery' ;

function createFormPotager() {
  $(document).ready(function(){ 
    
        var div=$("div #form-potager #form-potager-add"); 
        var btn = $("div #form-potager #createPotager");
        btn.hide();
        div.hide(); 
         $("#nbPotager").change(function(){
          var nb= $("#nbPotager").val() ;
          if(nb == 1){
            div.show();
          }
          for(var i=1; i<nb; i++){
            
              
            
            var span = $("div #form-potager #form-potager-add #showNbPotager");
           
            var div2=$("div #form-potager");
           // div2.append($("div #form-potager-add"));
            div.show();
          
           div.clone().appendTo("div #form-potager");  
          
            btn.insertAfter(div);
            //btn.show();
          
           
          // span.text("Potager: " + (i-1));
          
          

          }
          
         
        });
       
        
   
}); 
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
  exampleForm2: FormGroup ;
  idPotager: string ;
  idUser: string ; 
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
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
    this.createForm2();
    createFormPotager();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      ville: ['', Validators.required ],
      telephone: ['', Validators.required ],
      mdp: ['', Validators.required ],
      nbr_potager: ['', Validators.required ]
    });
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
   
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      mdp: new FormControl('', Validators.required),
      nbr_potager: new FormControl('', Validators.required)
    });
    this.exampleForm2 = this.fb2.group({
      namePotager: new FormControl('', Validators.required),
      lib: new FormControl('', Validators.required),
      orientation: new FormControl('', Validators.required),
      surface: new FormControl('', Validators.required),
      localisation: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    this.firebaseService.createUser(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

  createPotager(valuePotager){
    this.firebaseService.createPotager(valuePotager).then(
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
  
