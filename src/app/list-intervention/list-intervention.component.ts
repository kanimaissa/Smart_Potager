import { Component, OnInit } from '@angular/core';
import {InterventionService} from '../../services/intervention.service';
import { FirebaseService } from '../../services/firebase.service';
import {ServiceComposantService} from '../../services/service-composant.service';

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
    public composantService: ServiceComposantService,) { }

  ngOnInit() {
    this.listIntervention() ;
  }

  listIntervention(){
    this.intervService.getIntrevention().subscribe(dataInterv=>{
        this.dataInterv = dataInterv;
        dataInterv.forEach(elemInterv =>{
          console.log(elemInterv.payload.doc.get('composant'))
          this.composantService.getCapteurwithID(elemInterv.payload.doc.get('composant')).subscribe(dataCmp=>{
            this.dataCmp.push(dataCmp.data().libelle) ;
            console.log("tttt"+ dataCmp.data().libelle)
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

}
