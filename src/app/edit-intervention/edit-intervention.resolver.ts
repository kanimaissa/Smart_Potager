import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../../services/firebase.service';
import {InterventionService} from '../../services/intervention.service';

@Injectable()
export class EditInterventionResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService, 
    public interventionService: InterventionService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let intervId = route.paramMap.get('id');
      this.interventionService.getInterventionWithID(intervId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
