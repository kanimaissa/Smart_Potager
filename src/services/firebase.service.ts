import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  docIdUser :any ;

  constructor(public db: AngularFirestore) {}

 

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByNbr_Potager(value){
    return this.db.collection('users',ref => ref.orderBy('nbr_potager').startAt(value)).snapshotChanges();
  }


  createUser(value){
    return this.db.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      telephone: parseInt(value.telephone),
      ville:value.ville,
      mdp: value.mdp,
      nbr_potager:parseInt(value.nbr_potager)

      
    });
  }

  updateUserPotager(userKey, value){
    // value.nameToSearch = value.name.toLowerCase();
     return this.db.collection('users').doc(userKey).set(value);
    
   }

   getPotagerUser(user){
    //this.db.collection('potager').where('users.potager', '==', idPotager)
 //   return this.db.collection('potager')
 //   .get()
   return this.db.collection('users').doc(user).collection('potagerUser').snapshotChanges();
 //   .subscribe((snapshot) =>{
       
 //         console.log(snapshot.id, '=>', snapshot.data());
      
 // }
 //    );
}

getPotagerwithID(potager){
  return this.db.collection('potager').doc(potager)
  .get()
  
}
  potagerUser(idPotager , idUser){
    this.docIdUser = this.db.collection("users").doc(idUser);
  
    return this.docIdUser.collection("potagerUser").add({
      potager: idPotager
    })
    // return this.docIdUser.set({
    //     potager: 
    //      idPotager 
       
    // },{ merge: true })
    
  }

  createPotager(value){
    return this.db.collection('potager').add({
      name: value.namePotager,
      libelle: value.lib,
      surface: value.surface,
      orientation: value.orientation,
      localisation: value.localisation,
    });
    
  }
}
