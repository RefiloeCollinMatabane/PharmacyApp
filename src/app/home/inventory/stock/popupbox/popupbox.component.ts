import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InventoryServices } from '../../inventory.service';

import { ProductData } from '../../../../../../backend/models/inventory.js';


/*
export interface UsersData {
  name: string;
  id: number;
}*/

@Component({
  selector: 'app-popupbox',
  templateUrl: './popupbox.component.html',
  styleUrls: ['./popupbox.component.css']
})
export class PopupboxComponent implements OnInit {

  showDateInput = false;
  minDate = new Date();
  maxDate = new Date();

  radioValueCheck(x) {
    this.showDateInput = (x === 2);
    }

  action: string;
  local_data: any;

  constructor(public dialogRef: MatDialogRef<PopupboxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductData) {

    
      this.local_data = {...data};
      console.log(this.local_data);
      this.action = this.local_data.action;      
     }

     doAction( ){
      this.dialogRef.close({event:this.action, data:this.local_data}); 
      /*if({event: 'Update'}){
        this.dialogRef.close({event:this.action, data: this.inventoryServices.updateInventory});
      }else{
        this.dialogRef.close({event:this.action, data: this.inventoryServices.deleteInventory});
      } */
    }
  
    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
    }

  ngOnInit() {}

}
