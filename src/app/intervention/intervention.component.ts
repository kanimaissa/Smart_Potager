
import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {InterventionService} from '../../services/intervention.service';
import { FirebaseService } from '../../services/firebase.service';
import {ServiceComposantService} from '../../services/service-composant.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss']
})
export class InterventionComponent implements OnInit {

  exampleForm: FormGroup;
  idCmp : Array<any> =[] ;
  idcomposant: any ;
   cmp : any ;
   dataCmp : any ;
   dataUser: any ;
   ptg: any ;
   user: any ;
   elem : any ;
   vilUser : any ;
  telUser: any ;
 adrUser: any ;
 refCmp: any;

  constructor(  @Inject(MAT_DIALOG_DATA) public data: DialogData,
  public dialogRef: MatDialogRef<InterventionComponent>,
  private fb: FormBuilder,
  public intervService :InterventionService,
  public firebaseService: FirebaseService,
    public composantService: ServiceComposantService,
    public route: ActivatedRoute ,
    private router: Router) { }
  ngOnInit() {

    
    
   
    // this.dialogRef.afterClosed().subscribe(elem =>{
    //   console.log(elem.data);
    // })
   // console.log(this.dialogRef.componentInstance.data)
   this.idCmp.push(this.dialogRef.componentInstance.data);
   this.idCmp.forEach(elem =>{
     this.idcomposant = elem.idcmp ;
     this.refCmp = elem.refcmp ;
     this.cmp = elem.namecmp ;
     this.ptg = elem.nameptg ;
     this.user = elem.nameuser ;
     this.adrUser = elem.adruser;
     this.vilUser = elem.viluser ;
     this.telUser = elem.teluser ;
    
    //elem = elem ;
     
   })
  
   
   console.log("name user: "+ this.cmp);
   this.createForm();
  
  }
  
  closeDialog(): void {
    this.dialogRef.close();
    
    
  }


  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ]
  
  };


  
  resetFields(){
   
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required)
     
    });
  }

  createForm() {
    
    //console.log('uuuuu: '+this.vilUser);
    this.exampleForm = this.fb.group({
      refComposant: [this.refCmp , Validators.required ],
      libComposant: [this.cmp , Validators.required ],
      description: ['', Validators.required ],
      dateDebutInterv: ['', Validators.required ],
      timeInterv:  ['', Validators.required ],
      adrUser: [this.adrUser, Validators.required ],
      telUser: [this.telUser, Validators.required ],
      vilUser: [this.vilUser, Validators.required ],
    
    });

  }
  saveIntervention(value){
     // console.log(elem.cmp)
        this.intervService.addIntervention(value, this.idcomposant);
        this.closeDialog();
        this.router.navigate(['/intervention']);
  
  }

  // getDataDialog(){
  //   this.composantService.getComposantPotager(this.cmp).subscribe(dataCmp=>{
  //     this.dataCmp = dataCmp
  //   })
    //this.firebaseService.getUser()
  //}
  
}

export interface DialogData {
 
  name: string;

}
