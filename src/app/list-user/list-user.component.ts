import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  
  ageValue: number = 0;
  searchRecord: string = "";

  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;

  items: Array<any>;
  Age_filtered_items: Array<any>;
  Name_filtered_items: Array<any>;

  constructor(private crudService: UserService) { }
  

  ngOnInit() {
    this.crudService.read_Students().subscribe(data => {
 
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
        };
      })
      console.log(this.students);
 
    });
  }


  RemoveRecord(rowID) {
    this.crudService.delete_Student(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }







  getData(){
    this.crudService.read_Students()
    .subscribe(result => {
      this.items = result;
      this.Age_filtered_items = result;
      this.Name_filtered_items = result;
    })
  }
  
  capitalizeFirstLetter(record){
    return record.charAt(0).toUpperCase() + record.slice(1);
  }
  searchByName(){
    let record = this.searchRecord.toLowerCase();
    this.crudService.searchUsers(record)
    .subscribe(result => {
      this.Name_filtered_items = result;
      this.items = this.combineLists(result, this.Age_filtered_items);
    })
  }

  rangeChange(event){
    this.crudService.searchUsersByAge(event.value)
    .subscribe(result =>{
      this.Age_filtered_items = result;
      this.items = this.combineLists(result, this.Name_filtered_items);
    })
  }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }


 

}
