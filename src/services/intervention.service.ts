import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(public db: AngularFirestore) { }

  addIntervention(value, idComposant){
    return this.db.collection('intervention').add({
      description: value.description,
      dateDebut: value.dateDebutInterv,
      time: value.timeInterv ,
      composant: idComposant, 
      achieved: false
    });
    
  }
  achivedInterv(idInterv){
    return this.db.collection('intervention').doc(idInterv).update({
      achieved: true, 
      dateFin: new Date().toLocaleString()
    })
  }
  getIntervWithCmp(idComposant){
    return this.db.collection('intervention', ref=> ref.where('composant', '==', idComposant)).snapshotChanges();
  }

  /*** not used ***/
  /*affectIntervPotager(idComposant, idInterv){
    return this.db.collection('intervention_potager').add({
      composant: idComposant ,
      intervention: idInterv,
      
    })
  }*/

  getIntrevention(){
    return this.db.collection('intervention').snapshotChanges();
  }
}
