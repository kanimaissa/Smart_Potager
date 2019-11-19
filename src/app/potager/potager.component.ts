import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-potager',
  templateUrl: './potager.component.html',
  styleUrls: ['./potager.component.scss']
})
export class PotagerComponent implements OnInit {
  items :Array<string>;

  constructor(public firebaseService: FirebaseService, public route: ActivatedRoute ) { }

  ngOnInit() {
   this.viewPotagers();
  }

  viewPotagers(){
    let userId = this.route.snapshot.paramMap.get('id');
   //let userId = "FPgZcMRVT1K18ZGHC1WR" ;
     console.log("param " + userId);
  //   return this.firebaseService.getPotagerUser(userId);

    
       return  this.firebaseService.getPotagerUser(userId)
      .subscribe(result => {
         result.forEach(doc =>{
         // console.log("potager" + doc.payload.doc.data().potager);
          this.firebaseService.getPotagerwithID(doc.payload.doc.data().potager)
          .subscribe(
             res =>{
            
              this.items = res.data().libelle ;

           console.log("data: "+this.items);
          });
        });
       
       //console.log("item "+this.items.libelle);

      })

    
            }
}
