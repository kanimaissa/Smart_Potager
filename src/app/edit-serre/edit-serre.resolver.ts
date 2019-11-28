import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../../services/firebase.service';

@Injectable()
export class EditSerreResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let serreId = route.paramMap.get('id');
      this.firebaseService.getAllPotagers().subscribe(res=>{
        res.forEach(doc=>{
          
          this.firebaseService.getSerrerwithID(doc.payload.doc.id, serreId)
          .subscribe(
            data => {
              console.log('doc: '+ data.data().position)
              resolve(data);
            }
          );
        })
      })
     
    })
  }
}
