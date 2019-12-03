import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewPotagerComponent } from '../new-potager/new-potager.component';
@Component({
  selector: 'app-potager',
  templateUrl: './potager.component.html',
  styleUrls: ['./potager.component.scss']
})
export class PotagerComponent implements OnInit {
  items :Array<any> = [];
  userId: any ;
  itemIdPtg : Array<any> = [] ;
  itemIdUser: Array <any> = [] ;
  constructor(public firebaseService: FirebaseService,
              public route: ActivatedRoute,  
              private router: Router,
              public dialog: MatDialog ) 
              { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
   this.viewPotagers();
  // getdeletePotager(idpotager)
  }

  viewPotagers(){
    
   //let userId = "FPgZcMRVT1K18ZGHC1WR" ;
//     console.log("param " + userId);
  //   return this.firebaseService.getPotagerUser(userId);

    
      return this.firebaseService.getPotagerUser(this.userId)
      .subscribe(result => {
        return result.forEach(doc =>{
         // console.log("potager" + doc.payload.doc.data().potager);
         this.firebaseService.getPotagerwithID(doc.payload.doc.data().potager)
          .subscribe(
             res =>{
            
              this.items.push(res) ;
          console.log("data: "+this.items);
          }
          );
        }
        );
       
       console.log("item "+this.items);

      })
            }

            viewSerres(item){
              this.router.navigate(['/serres/'+ item.id]);
            }
            addSerres(item){
              this.router.navigate(['/add-serres/'+ item.id]);
            }
            deletePotager(idpotager){
              console.log(idpotager.id);
             // this.firebaseService.deletePotager(item.id);
             this.firebaseService.getUsers().subscribe(res=>{
               res.forEach(element =>{
                // console.log(element.payload.doc.id);
                this.firebaseService.getPotagerUser(element.payload.doc.id).subscribe(res=>{
                 res.forEach(elem =>{
                  // console.log(elem.payload.doc.data().potager);
                  this.firebaseService.deletePotager(element.payload.doc.id,idpotager.id).subscribe(result =>{
                    //console.log('res: '+ result);
                    result.forEach(itempotager =>{
                      console.log('item: '+ itempotager.payload.doc.id);
                      this.itemIdPtg.push(itempotager.payload.doc.id);
                      this.itemIdUser.push(element.payload.doc.id)
                    // return this.firebaseService.delete(element.payload.doc.id,  itempotager.payload.doc.id)  
                      
                    })
                    return this.firebaseService.delete(this.itemIdUser, this.itemIdPtg);
                    
                    
                  });
                 })
                })
               })
             })
            
            }

            // deletePotager(){
            //   this.firebaseService.delete(this.itemIdUser,  this.itemIdPtg)
            // }

editPotager(item){
  this.router.navigate(['/edit-potager/'+ item.id]);
}
addPotager(){
  this.router.navigate(['/new-potager/'+ this.userId]);
}

openDialogAddPotager(): void {
  const dialogRef = this.dialog.open(NewPotagerComponent, {
    width: '800px',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}
}
