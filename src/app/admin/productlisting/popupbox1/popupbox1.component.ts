import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//import { ProductlistingServices } from '../productlisting.service';

import { ProductData } from '../../../../../backend/models/product.js';

@Component({
  selector: 'app-popupbox1',
  templateUrl: './popupbox1.component.html',
  styleUrls: ['./popupbox1.component.css']
})
export class Popupbox1Component implements OnInit {


  action: string;
  local_data: any;

  constructor(public dialogRef: MatDialogRef<Popupbox1Component>,
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
    

  ngOnInit() {
  }

}
