import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
    this.firestore.doc('User/' + recordID).update(record);
  }

  delete_Student(record_id) {
    this.firestore.doc('User/' + record_id).delete();
  }

}
