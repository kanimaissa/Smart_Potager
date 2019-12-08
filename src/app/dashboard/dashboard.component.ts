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
import {InterventionService} from '../../services/intervention.service';

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
  alertCmp : Array<any> =[]  ;
  alertCmpVal : Array<any> = [] ;
  successCmp : Array<any> =[]  ;
  successCmpVal : Array<any> = [] ;
  itemPtg : Array<any> = [];
  itemPtgAlert : Array<any>  ;
  itemPtgSuccess : Array<any> = [] ;
  itemCmpInterv: Array<any> = [] ;
  itemCmpAchieved: Array<any> = [] ;
  itemInterv : Array<any> = [];
  itemAchieved: Array<any> = [] ;
  itemPtgInterv: Array<any> = [] ;
  itemPtgAchieved :Array<any> = [] ;
  itemUserIntev : Array<any> = [];

  itemSerre : Array<any> = [];
  itemSerreAlert : Array<any>  ;
  itemSerreSuccess : Array<any> = [] ;

  itemUser : Array<any> = [] ;
  itemDiff : Array<any> = [];
  itemDiffAlert : Array<any> = [];
  itemDiffSuccess : Array<any> = [];

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
    public dialog: MatDialog,
    public intervService :InterventionService, ) { }

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
       
            /********case Repair *****/
            this.intervService.getIntervWithCmp(element.id).subscribe(dataInterv=>{
              dataInterv.forEach(elemInterv=>{
                if(elemInterv.payload.doc.get('achieved') == false){
                  this.itemInterv= dataInterv
                  console.log('not achieved');
                  this.itemCmpInterv.push(element);
                this.composantService.getComposantPotager(element.id).subscribe(dataCmpPtg =>{
                  dataCmpPtg.forEach(elementCmpPtg =>{
                    this.firebaseService.getPotagerwithID(elementCmpPtg.data().potager).subscribe(dataPtg=>{
                      this.itemPtgInterv.push(dataPtg) ;
                      
                      console.log("succes: "+this.itemPtgInterv)
                    })
                   
                  })
                  
                })
                }else{
                  this.itemAchieved= dataInterv
                  console.log(' achieved');
                  this.itemCmpAchieved.push(element);
                this.composantService.getComposantPotager(element.id).subscribe(dataCmpPtg =>{
                  dataCmpPtg.forEach(elementCmpPtg =>{
                    this.firebaseService.getPotagerwithID(elementCmpPtg.data().potager).subscribe(dataPtg=>{
                      this.itemPtgAchieved.push(dataPtg) ;
                      
                      console.log("succes: "+this.itemPtgInterv)
                    })
                   
                  })
                  
                })
                }
                
                
              })
                
            })


          this.composantService.getValCapteur(element.id).subscribe(val =>{
            val.forEach(dataVal =>{
              //console.log('time: ' ) ;
             // console.log('time composant:' +dataVal.payload.doc.data().time); 
           // console.log('time: ' +((this.dateNow.getHours()+1) - dataVal.payload.doc.data().time))
            this.deadline = new Date( dataVal.payload.doc.data().date + " "+  dataVal.payload.doc.data().time).getTime();

            this.diffTime = this.dateNow - this.deadline ;
            this.hoursDiff = Math.floor((this.diffTime / (1000 * 60 * 60)) % 24);
           
            this.minuteDiff = Math.floor((this.diffTime / 1000 / 60) % 60);
               
            //const month = currentTime.getMonth();
            const diffHour = (this.hoursDiff < 10 ? "0" : "") + this.hoursDiff;
            const diffMinute = (this.minuteDiff < 10 ? "0" : "") + this.minuteDiff;
            
            this.diffTime = (diffHour +":" + diffMinute)
           console.log('time:'+ dataVal.payload.doc.data().time +" "+ this.diffTime +" "+ dataVal.payload.doc.data().date + " "+  dataVal.payload.doc.data().time);
           // data = [element.payload.doc.data().localisation]

           /************ case WARNING ********/

          if( (this.diffTime > element.data().timeMin)&& ( this.diffTime < element.data().timeMax)){
           this.itemDiff.push(this.diffTime)   ;
           
              this.itemCmp.push(element) ;      
              //this.itemCmpVal.push(dataVal)
             
            console.log('bonjour:' + this.diffTime + ">"+ element.data().timeMin +element.data().libelle)
            this.composantService.getComposantPotager(element.id).subscribe(dataCmpPtg =>{
              dataCmpPtg.forEach(elementCmpPtg =>{
                this.firebaseService.getPotagerwithID(elementCmpPtg.data().potager).subscribe(dataPtg=>{
                  
                  this.itemPtg.push(dataPtg) ;
                 console.log("po: "+dataPtg.data().name)
                })
               
              })
              
            });
            

          }

          /************ case SUCCESS ********/
          if(this.diffTime <= element.data().timeMin) {
            this.itemDiffSuccess.push(this.diffTime)   ;
               this.successCmp.push(element) ;      
               //this.itemCmpVal.push(dataVal)             
             this.composantService.getComposantPotager(element.id).subscribe(dataCmpPtg =>{
               dataCmpPtg.forEach(elementCmpPtg =>{
                 this.firebaseService.getPotagerwithID(elementCmpPtg.data().potager).subscribe(dataPtg=>{
                   this.itemPtgSuccess.push(dataPtg) ;
                   
                   console.log("succes: "+this.itemDiffSuccess)
                 })
                
               })
               
             })
 
           }

          /************ case URGENT ********/
          if( this.diffTime > element.data().timeMax){
            this.itemDiffAlert.push(this.diffTime)   ;
               this.alertCmp.push(element) ;      
               //this.itemCmpVal.push(dataVal)             
             this.composantService.getComposantPotager(element.id).subscribe(dataCmpPtg =>{
               dataCmpPtg.forEach(elementCmpPtg =>{
                 this.firebaseService.getPotagerwithID(elementCmpPtg.data().potager).subscribe(dataPtg=>{
                   this.itemPtgAlert=[dataPtg]
                   
                   console.log("urgent: "+element.data().libelle)
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
  