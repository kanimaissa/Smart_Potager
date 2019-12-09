import { Component, OnInit } from '@angular/core';
import {InterventionService} from '../../services/intervention.service';
import { FirebaseService } from '../../services/firebase.service';
import {ServiceComposantService} from '../../services/service-composant.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import {EditInterventionComponent} from '../edit-intervention/edit-intervention.component' ;

@Component({
  selector: 'app-list-intervention',
  templateUrl: './list-intervention.component.html',
  styleUrls: ['./list-intervention.component.scss']
})
export class ListInterventionComponent implements OnInit {

  dataInterv : any ;
  dataCmp : Array<any> =[] ;
  dataPtg: Array<any> =[] ;
  dataUser: Array<any> =[]  ;

  constructor( public intervService :InterventionService,
    public firebaseService: FirebaseService,
    public composantService: ServiceComposantService,
    public route: ActivatedRoute,  
              private router: Router,
              public dialog: MatDialog ) { }

  ngOnInit() {
    this.listIntervention() ;
  }

  listIntervention(){
    this.intervService.getIntrevention().subscribe(dataInterv=>{
        this.dataInterv = dataInterv;
        dataInterv.forEach(elemInterv =>{
          console.log(elemInterv.payload.doc.get('achieved'))
          this.composantService.getCapteurwithID(elemInterv.payload.doc.get('composant')).subscribe(dataCmp=>{
            this.dataCmp.push(dataCmp.data().libelle) ;
            console.log("tttt"+ dataCmp.data().achieved)
            this.composantService.getComposantPotager(elemInterv.payload.doc.get('composant')).subscribe(dataCmpPtg =>{
              dataCmpPtg.forEach(elemCmpPtg =>{
                this.firebaseService.getPotagerwithID(elemCmpPtg.data().potager).subscribe(dataPtg=>{
                  this.dataPtg.push(dataPtg.data().description) ;
                  this.firebaseService.getUser(dataPtg.data().user).subscribe(dataUser=>{
                    this.dataUser.push(dataUser.payload.get('name'));
                   // console.log("jjj: "+ dataUser.payload.get('name'))
                
                })
                })
              })
            })
          })
        })
        
     
    })
  }

  achivementInterv(idInterv){
    console.log(idInterv)
      this.intervService.achivedInterv(idInterv);
  }
  openDialogEditerInterv(): void {
    const dialogRef = this.dialog.open(EditInterventionComponent, {
      width: '700px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
