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
      email:value.email,
      telephone: parseInt(value.telephone),
      ville:value.ville,
      adresse:value.adresse,
      mdp: value.mdp,
      nbr_potager:parseInt(value.nbr_potager)


      
    });
  }

 


 

 


  /******************Potager ***************/

  getAllPotagers(){
    return this.db.collection('potager').snapshotChanges();
  }


  updateUserPotager(userKey, value){
    // value.nameToSearch = value.name.toLowerCase();
     return this.db.collection('users').doc(userKey).set(value);
    
   }
   potager : any;

   deletePotager(keyuser, potagerKey){
   
    this.db.collection('potager').doc(potagerKey).delete();
   
   //this.docIdPotager = this.db.collection('potagerUser').where('potager','==',potagerKey);
   return this.db.collection('users').doc(keyuser).collection('potagerUser', ref => ref.where('potager', '==', potagerKey)).snapshotChanges();
   
  //  this.docIdPotager.get().subscribe(function(querySnapshot) {
  //   //console.log('doc: '+ querySnapshot);
  //    querySnapshot.forEach(doc => {
  //     // doc.ref.delete();
  //     console.log('doc: ');
  //    });
  //  });
      
       //this.docPotagerUser.doc.ref.delete() ;       

  }

  updatePotager(value, keyPotager){
    value.name = value.namePotager,
      value.description= value.lib,
      value.surface= value.surface,
     value.orientation= value.orientation,
      value.localisation= value.localisation
     return this.db.collection('potager').doc(keyPotager).set(value);

  }

  delete(keyuser, potagerUserKey){
    this.db.collection('users').doc(keyuser).collection('potagerUser').doc(potagerUserKey).delete();
  }

  deleteSerrePotager(potagerkey, serreKey){
   this.db.collection('potager').doc(potagerkey).collection('serres').doc(serreKey).delete();
 
  }

   getPotagerUser(user){
  //   this.db.collection('potager').where('users.potager', '==', idPotager)
  //  return this.db.collection('potager')
  //  .get()
   return this.db.collection('users').doc(user).collection('potagerUser').snapshotChanges();
 //   .subscribe((snapshot) =>{
       
 //         console.log(snapshot.id, '=>', snapshot.data());
      
 // }
 //    );
}

getSerrePotager(potager){
  
 return this.db.collection('potager').doc(potager).collection('serres').snapshotChanges();
}
getCulturePotager(potager){
  return this.db.collection('potager').doc(potager).collection('serres').doc().collection('cultures').snapshotChanges();
}

getPotagerwithID(potager){
  return this.db.collection('potager').doc(potager)
  .get()
  
}


getCulturerwithID(serre){
  return this.db.collection('serres').doc(serre).collection('culture')
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

  serrePotager(idSerre , idPotager){
    this.docIdUser = this.db.collection("potager").doc(idPotager);
  
    return this.docIdUser.collection("serres").add({
      serre: idSerre
    })
    // return this.docIdUser.set({
    //     potager: 
    //      idPotager 
       
    // },{ merge: true })
    
  }

  createPotager(value, idUser){
    return this.db.collection('potager').add({
      name: value.namePotager,
     description: value.description,
      surface: value.surface,
      orientation: value.orientation,
      localisation: value.localisation,
      user: idUser,
    });
    
  }
  
  /*****************************Serres  *******************/

  getSerrerwithID(keyPotager, serre){
    return this.db.collection('potager').doc(keyPotager).collection('serres').doc(serre)
    .get()
    
  }

  addSerre(potager, value){
    return this.db.collection('potager').doc(potager).collection('serres').add({
      libelle_serre: value.lib,
      position: value.position,
      largeur:value.largeur,
      longueur:value.longueur
    });
    
  }

  updateSerre(value,  keyPotager, keySerre){
    value.libelle_serre= value.libSerre,
    value.position= value.position,
    value.largeur =value.largeur,
    value.longueur= value.longueur
     return this.db.collection('potager').doc(keyPotager).collection('serres').doc(keySerre).set(value);

  }

}
