import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import {ServiceComposantService} from '../../services/service-composant.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewPotagerComponent } from '../new-potager/new-potager.component';
import { element } from 'protractor';

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
  itemSerre: Array<any> ;
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


  constructor(public firebaseService: FirebaseService,
    public composantService: ServiceComposantService,
    public route: ActivatedRoute,  
    private router: Router,
    public dialog: MatDialog ) 
    { }

  ngOnInit() {

    //this.dateNumber = Date.parse(this.dateNowISO);
    this.cmpId = this.route.snapshot.paramMap.get('id');
   
    this.days= Math.floor(this.dateNumber / (1000 * 60 * 60 * 24));
    
    this.hours = Math.floor((this.dateNumber / (1000 * 60 * 60)) % 24); 
    this.minutes = Math.floor((this.dateNumber / 1000 / 60) % 60);
    this.seconds = Math.floor((this.dateNumber / 1000) % 60);

  // console.log('date:' + this.dateNow + '/'+ this.dateNow + '/' );
    
    this.detailsComposant()
  //console.log(this.dateNow.getMonth()+1 +" "+'/'+ (this.dateNow.getDate()) + '/' + this.dateNow.getFullYear())
    

  }

  

  detailsComposant(){
      this.composantService.getCapteurwithID(this.cmpId).subscribe(dataCmp =>{
        this.itemCmp.push(dataCmp) ;
       // console.log(dataCmp.payload.data().libelle)
      this.composantService.getValCapteur(this.cmpId).subscribe(dataValCmp =>{
          this.itemCmpVal = dataValCmp;
         // console.log(dataValCmp)
      })
      
      })
      
        this.composantService.getComposantPotager(this.cmpId).subscribe(dataCmpPtg =>{
          dataCmpPtg.forEach(elementCmpPtg=>{
            console.log("ComposantPotager: "+ elementCmpPtg.data().potager)
            this.firebaseService.getPotagerwithID(elementCmpPtg.data().potager).subscribe(dataPtg =>{
              console.log(dataPtg.data().libelle);
              this.itemPotager.push(dataPtg);
              this.firebaseService.getSerrePotager(dataPtg.id).subscribe(dataCmpSerre =>{
                this.itemSerre = dataCmpSerre
                this.firebaseService.getUser(dataPtg.data().user).subscribe(dataUser=>{
                  this.itemUser.push(dataUser) ;
                })
              })
            })
          })
         
        })
        
      
  }

}
