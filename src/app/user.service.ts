import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup,FormControl, FormControlName} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private firestore: AngularFirestore
  ) { }

 

 
  create_NewStudent(record) {
    return this.firestore.collection('User').add(record);
  }

  read_Students() {
    return this.firestore.collection('User').snapshotChanges();
  }

  update_Student(recordID,record){
    record.nameToSearch = record.Name.toLowerCase();
    this.firestore.doc('User/' + recordID).update(record);
  }

  delete_Student(record_id) {
    this.firestore.doc('User/' + record_id).delete();
  }

  searchUsers(searchRecord){
    return this.firestore.collection('User',ref => ref.where('nameToSearch', '>=', searchRecord)
      .where('nameToSearch', '<=', searchRecord + '\uf8ff'))
      .snapshotChanges()
  }
  searchUsersByAge(record){
    return this.firestore.collection('User',ref => ref.orderBy('Age').startAt(record)).snapshotChanges();
  }

}
