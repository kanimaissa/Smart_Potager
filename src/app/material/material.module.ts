import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatStepperModule,
    Material.MatFormFieldModule,
    Material.MatButtonModule,
    Material.MatCheckboxModule,
    Material.MatIconModule,
    Material.MatSliderModule,
    Material.MatInputModule,
    Material.MatPaginatorModule,
    Material.MatDialogModule,
    Material.MatTableModule
  ],
  exports: [
    Material.MatStepperModule,
    Material.MatFormFieldModule,
    Material.MatButtonModule,
    Material.MatCheckboxModule,
    Material.MatIconModule,
    Material.MatSliderModule,
    Material.MatInputModule,
    Material.MatPaginatorModule,
    Material.MatDialogModule,
    Material.MatTableModule
  ]
 
})
export class MaterialModule { }
