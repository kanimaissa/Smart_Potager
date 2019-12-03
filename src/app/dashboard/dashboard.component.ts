import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ComposantComponent} from '../../app/composant/composant.component';
import{SharedDataComposantService} from '../../services/shared-data-composant.service';
import { element } from 'protractor';
import { FirebaseService } from '../../services/firebase.service';
import {ServiceComposantService} from '../../services/service-composant.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewPotagerComponent } from '../new-potager/new-potager.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
 
  //cmp: ComposantComponent ; 
  
  msg : string = "bonjour chaima";
  composant :  Array<any> = [];
  diffTime : any ;
  etatUrgent: Array<any> = [] ;
  etatNormal: Array<any> =[] ;
  etatAvertissement: Array <any> = [] ;

  itemCmp : Array<any> =[]  ;
  itemCmpVal : Array<any> = [] ;
  itemPtg : Array<any> ;
  itemUser : Array<any> = [] ;
  itemDiff : Array<any> = [] ;

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

 
  constructor(public serviceCmp : ComposantComponent,
    public firebaseService: FirebaseService,
    public composantService: ServiceComposantService,
    public route: ActivatedRoute,  
    private router: Router,
    public dialog: MatDialog ) { }

    ngOnInit() {

      //this.dateNumber = Date.parse(this.dateNowISO);
     
      this.days= Math.floor(this.dateNumber / (1000 * 60 * 60 * 24));
      
      this.hours = Math.floor((this.dateNumber / (1000 * 60 * 60)) % 24); 
      this.minutes = Math.floor((this.dateNumber / 1000 / 60) % 60);
      this.seconds = Math.floor((this.dateNumber / 1000) % 60);
  
    // console.log('date:' + this.dateNow + '/'+ this.dateNow + '/' );
      this.controlerComposant();
    //console.log(this.dateNow.getMonth()+1 +" "+'/'+ (this.dateNow.getDate()) + '/' + this.dateNow.getFullYear())
      
  
    }
  
    controlerComposant(){
  
       this.composantService.getCapteur().subscribe(data =>{
       //console.log('data:' + data);
         data.forEach(element =>{
       //console.log('element:' + element.payload.doc.data().libelle);
       
          this.composantService.getValCapteur(element.id).subscribe(val =>{
            val.forEach(dataVal =>{
              //console.log('time: ' ) ;
             // console.log('time composant:' +dataVal.payload.doc.data().time); 
           // console.log('time: ' +((this.dateNow.getHours()+1) - dataVal.payload.doc.data().time))
            this.deadline = new Date( dataVal.payload.doc.data().date + " "+  dataVal.payload.doc.data().time).getTime();
            this.diffTime = this.dateNow - this.deadline
            this.hoursDiff = Math.floor((this.diffTime / (1000 * 60 * 60)) % 24);
           
            this.minuteDiff = Math.floor((this.diffTime / 1000 / 60) % 60);
            this.diffTime = (this.hoursDiff +":" + this.minuteDiff)
           console.log('time:'+ dataVal.payload.doc.data().time +" "+ this.hoursDiff +":" + this.minuteDiff +" "+ dataVal.payload.doc.data().date + " "+  dataVal.payload.doc.data().time);
           // data = [element.payload.doc.data().localisation]
          if( this.diffTime > element.data().timeMin){
            this.itemDiff.push([{diff: this.hoursDiff}]) ;
              this.itemCmp.push(element) ;
              //this.itemCmpVal.push(dataVal)
             
            console.log('bonjour:' + this.diffTime + ">"+ element.data().timeMin +element.data().libelle)
            this.composantService.getComposantPotager(element.id).subscribe(dataCmpPtg =>{
              dataCmpPtg.forEach(elementCmpPtg =>{
                this.firebaseService.getPotagerwithID(elementCmpPtg.data().potager).subscribe(dataPtg=>{
                  this.itemPtg= [dataPtg]
                  console.log("po: "+dataPtg.data().name)
                })
               
              })
              
            })

          }
            
            })
          })
        })
      })
    }

    detailsComposant(){

    }
  
  }
  