import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../../services/firebase.service';

@Injectable()
export class EditPotagerResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let potagerId = route.paramMap.get('id');
      this.firebaseService.getPotagerwithID(potagerId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
