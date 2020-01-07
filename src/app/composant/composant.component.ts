import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import {ServiceComposantService} from '../../services/service-composant.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material';
import { NewPotagerComponent } from '../new-potager/new-potager.component';
import { element } from 'protractor';
import { InterventionComponent } from '../intervention/intervention.component';
import {InterventionService} from '../../services/intervention.service';
import {DialogService} from '../../services/dialog.service';
@Component({
  selector: 'app-composant',
  templateUrl: './composant.component.html',
  styleUrls: ['./composant.component.scss']
})
export class ComposantComponent implements OnInit {
  msg : string = "bonjour chaima";
  composant :  Array<any> = [];
  diffTime : any ;
  etatUrgent: Array<any> = [] ;
  etatNormal: Array<any> =[] ;
  etatAvertissement: Array <any> = [] ;

  itemCmp :Array<any> = [];
  itemCmpVal: Array<any> ;
  itemSerre: Array<any> = [] ;
  itemPotager: Array <any> = [];
  itemUser: Array <any> =[];

  dateNow: any =  new Date().getTime() ;
  //dateNowISO = this.dateNow.toISOString();
  deadline: any ;
  dateNumber: number;
  days : number ;
  time: number;
  seconds: number;
  minutes: number ;
  hours: number;
  hoursDiff: number;
  minuteDiff: number ;
  cmpId: any;
  userId: any ;
  cmp: any ;
 ptgName : any ;
 dataInterv :any;
 show : boolean = false;
 

  constructor(public firebaseService: FirebaseService,
    public composantService: ServiceComposantService,
    public route: ActivatedRoute,  
    private router: Router,
    public dialog: MatDialog,
    public intervService :InterventionService,
    private dialogservice:DialogService,
    ) 
    { }

  ngOnInit() {

   
    //this.dateNumber = Date.parse(this.dateNowISO);
    this.cmpId = this.route.snapshot.paramMap.get('id');
   
    this.days= Math.floor(this.dateNumber / (1000 * 60 * 60 * 24));
    
    this.hours = Math.floor((this.dateNumber / (1000 * 60 * 60)) % 24); 
    this.minutes = Math.floor((this.dateNumber / 1000 / 60) % 60);
    this.seconds = Math.floor((this.dateNumber / 1000) % 60);

  // console.log('date:' + this.dateNow + '/'+ this.dateNow + '/' );
  this.infoIntervention() ;
    this.detailsComposant();
   

  //console.log(this.dateNow.getMonth()+1 +" "+'/'+ (this.dateNow.getDate()) + '/' + this.dateNow.getFullYear())
  
 
  }

  infoIntervention(){
    this.intervService.getIntervWithCmp(this.cmpId).subscribe(dataInterv=>{
     //dataInterv.forEach(elemInterv=>{
       this.dataInterv = dataInterv ;
       console.log('looooog: '+ dataInterv)
  //  })
      
    })
  }

  detailsComposant(){
      this.composantService.getCapteurwithID(this.cmpId).subscribe(dataCmp =>{
        this.itemCmp.push(dataCmp) ;
        this.cmp = dataCmp.data()
       
      this.composantService.getValCapteur(this.cmpId).subscribe(dataValCmp =>{
          this.itemCmpVal = dataValCmp;
         // console.log(dataValCmp)
      })
      // if(dataCmp.data().localisation == "serre"){
      //   this.composantService.getComposantPotager(this.cmpId).subscribe(dataCmpPtg =>{
      //     dataCmpPtg.forEach(elementCmpPtg=>{
      //       console.log("ComposantPotager: "+ elementCmpPtg.data().potager)
      //       this.firebaseService.getPotagerwithID(elementCmpPtg.data().potager).subscribe(dataPtg =>{

      //       })
      //     })
      //   })
        
      // }
      
      })
      
        this.composantService.getComposantPotager(this.cmpId).subscribe(dataCmpPtg =>{
          dataCmpPtg.forEach(elementCmpPtg=>{
            this.intervService.getIntrevention().subscribe(datainterv=>{
              for(let eleminterv of datainterv) {
               // if(something_wrong) break;
               if((eleminterv.payload.doc.get('composant')  == elementCmpPtg.data().capteur)|| (elementCmpPtg.data().actionneur == eleminterv.payload.doc.get('composant'))){
                this.show = false ;
                console.log(elementCmpPtg.data().capteur +" =="+eleminterv.payload.doc.get('composant'));
                 break ;
              }else{
                this.show = true ;
                console.log(elementCmpPtg.data().capteur +" !="+eleminterv.payload.doc.get('composant'));
              }
             }
              
            })
            
            console.log("ComposantPotager: "+ elementCmpPtg.data().potager)
            this.firebaseService.getPotagerwithID(elementCmpPtg.data().potager).subscribe(dataPtg =>{
              console.log(dataPtg.data().libelle);
              this.ptgName = dataPtg.data().libelle
              this.itemPotager.push(dataPtg);
              this.composantService.getCapteurwithID(this.cmpId).subscribe(dataCmp =>{
                if(dataCmp.data().localisation == "serre"){
                  this.composantService.getComposantSerrePotager(elementCmpPtg.id, this.cmpId).subscribe(dataCmpPtgSer=>{
                   
                    dataCmpPtgSer.forEach(elementCmpPtgSer =>{
                     
                      this.firebaseService.getSerrerwithID(dataPtg.id, elementCmpPtgSer.data().serre).subscribe(dataCmpSerre =>{
                        this.itemSerre.push(dataCmpSerre)
                       
                        })
                      })
                    })
                }
              
              })
                this.firebaseService.getUser(dataPtg.data().user).subscribe(dataUser=>{
                   
                  this.userId = dataUser.payload.data();
                  
                  this.itemUser.push(dataUser) ;
              })
              
            })
           
          })
         
        })
        
        
  }

 
    
  


  openDialogAddIntervention(): void{
    const dialogRef = this.dialog.open(InterventionComponent, {
      width: '700px',
     
      panelClass:'intervention-dialog-container',
      //data: {cmp: {1: this.cmpId, 2:"nnnnnn"}}
     
      data : {idcmp: this.cmpId, refcmp: this.cmp.reference, nameuser: this.userId.name ,
        adruser: this.userId.adresse, teluser: this.userId.telephone, viluser: this.userId.ville , 
        namecmp: this.cmp.libelle, nameptg: this.ptgName}
    
    });
    dialogRef.afterClosed().subscribe(result => {
     
      //dialogRef.close({data: this.cmpId})
     // console.log(result);
    });
    
  }

}








export interface DialogData {
  cmpId: any;
  name: string;
}