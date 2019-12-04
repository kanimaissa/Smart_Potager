import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss']
})
export class InterventionComponent implements OnInit {
  exampleForm: FormGroup;

  constructor(  @Inject(MAT_DIALOG_DATA) public data: DialogData,
  public dialogRef: MatDialogRef<InterventionComponent>,
  private fb: FormBuilder) { }
  ngOnInit() {
    this.createForm();
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }


  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ]
  
  };


  
  resetFields(){
   
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required)
     
    });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ]
    
    });

  }
}

export interface DialogData {
 
  name: string;
}
