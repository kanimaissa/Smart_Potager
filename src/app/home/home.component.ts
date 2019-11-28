import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewUserComponent } from '../new-user/new-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  nbr_potager_Value: number = 0;
  searchValue: string = "";
  items: Array<any>;
  nbr_potager_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

 
  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public dialog: MatDialog
 
    
   
  ) { }

  ngOnInit() {
    this.getData();
    
  }

  openDialogAddUser(): void {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  openDialogShowUser(): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  
  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
      this.nbr_potager_filtered_items = result;
      this.name_filtered_items = result;
    })
  }

  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.nbr_potager_filtered_items);
    })
  }

  rangeChange(event){
    this.firebaseService.searchUsersByNbr_Potager(event.value)
    .subscribe(result =>{
      this.nbr_potager_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
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

  viewPotagers(item){
    this.router.navigate(['/potagers/'+ item.payload.doc.id]);
    
  }

}






