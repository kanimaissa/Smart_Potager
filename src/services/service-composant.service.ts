import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { timestamp } from 'rxjs/operators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
@Injectable({
  providedIn: 'root'
})
export class ServiceComposantService {

   dateNow : Date ;
  
  constructor(public db: AngularFirestore) { }

  getCapteur(){
    return this.db.collection('capteur').get();
  }

  getCapteurwithID(idCapteur){
    return this.db.collection('capteur').doc(idCapteur).snapshotChanges();
  }

  getAcionneur(){
    
    return this.db.collection('actionneur').snapshotChanges();
  }
  getActionneurwithID(idActionneur){
    return this.db.collection('actionneur').doc(idActionneur).snapshotChanges();
  }
  
  getValCapteurToday(idCapteur){
    this.dateNow = new Date() ;
    return this.db.collection('capteur').doc(idCapteur).collection('valCapteur', ref => ref.where("date", "==", (this.dateNow.getMonth()+1) + '/'+ (this.dateNow.getDate()) + '/' + this.dateNow.getFullYear() ).orderBy("time", "desc").limit(1)).snapshotChanges();
  }
  getValCapteur(idCapteur){
    this.dateNow = new Date() ;
    return this.db.collection('capteur').doc(idCapteur).collection('valCapteur', ref => ref.orderBy("date", "desc").orderBy("time", "desc").limit(1)).snapshotChanges();
  }

  getEtatActionneur(idAct){
    return this.db.collection('actionneur').doc(idAct).collection('etatActionneur').snapshotChanges();
  }
  getComposantPotager(idComposant){
      return this.db.collection('potager_composant', ref => ref.where("capteur", "==", idComposant) || ref.where("actionneur", "==", idComposant)).get();
  }
  getComposantSerrePotager(idPotager, idComposant){
    return this.db.collection('potager_composant').doc(idPotager).collection('serre_composant', ref => ref.where("capteur", "==", idComposant) || ref.where("actionneur", "==", idComposant)).get();
  }


}
