import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-serre',
  templateUrl: './serre.component.html',
  styleUrls: ['./serre.component.scss']
})
export class SerreComponent implements OnInit {

  items :Array<any> ;
  cultures: Array<any> =[];
  potagerId ;

  constructor(public firebaseService: FirebaseService, public route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.potagerId = this.route.snapshot.paramMap.get('id');
    this.viewSerres();
    this.viewCultures();
    this.getData();
  }

  getData(){
    
  }

  viewSerres(){
    
  //  let userId = "FPgZcMRVT1K18ZGHC1WR" ;
  //   console.log("param " + userId);
  //   return this.firebaseService.getPotagerUser(userId);

    
      return this.firebaseService.getSerrePotager(this.potagerId)
      .subscribe(res => {
         this.items =res ;
          //console.log("data: "+this.items);
          
      });

      

}

viewCultures(){

  return this.firebaseService.getSerrePotager(this.potagerId)
  .subscribe(result => {
    return result.forEach(doc =>{
     // console.log("potager" + doc.payload.doc.data().potager);
     this.firebaseService.getCulturerwithID(doc.payload.doc.id)
      .subscribe(
         res =>{
        
          this.cultures.push(res) ;
      console.log("data: "+res);
      }
      );
    }
    );
   
   console.log("item "+this.items);

  })

// return this.firebaseService.getCulturePotager(this.potagerId)
// .subscribe(result =>{
//   this.cultures = result ;
//   console.log("data: "+this.items);
// })
}

deleteSerre(item){
  this.firebaseService.getAllPotagers()
  .subscribe(result => {
  result.forEach(res =>{
    
    this.firebaseService.deleteSerrePotager(res.payload.doc.id, item.payload.doc.id)
    console.log('deleted item '+res.payload.doc.id)
   });
   
  })

}

editSerre(item){
 
  this.router.navigate(['/edit-serre/'+ item.payload.doc.id]);
}
}
