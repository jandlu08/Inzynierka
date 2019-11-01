import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-ingredient-info',
  templateUrl: './ingredient-info.component.html',
  styleUrls: ['./ingredient-info.component.scss']
})
export class IngredientInfoComponent implements OnInit {

  ingredientDescription: string;

  constructor(private dialogRef: MatDialogRef<IngredientInfoComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.ingredientDescription = data;
  }

  ngOnInit() {
  }
  close(){
    this.dialogRef.close();
  }
}
