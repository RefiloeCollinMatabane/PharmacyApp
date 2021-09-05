import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatDialog } from '@angular/material';
import { InventoryServices } from '../inventory.service';
import { PopupboxComponent } from './popupbox/popupbox.component';
import { ProductData } from '../../../../../backend/models/inventory.js';

/* 
export interface ProductData {
  pcode: string;
  pname: string;
  pdescription: string;
  pqty: number;
  pminqty: number;
  stockid: string;
  unitprice: number;
  sellingprice: number;
  manudate: Date;
  expdate: Date;
  paymenttype: string;
  creditdue: Date;
  supcode: string;
  supname: string;
  supnumber: number;
  supaddress: string;
}
*/

/**
 *@title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  searchTerm : string;
  inventory : ProductData[] = [];
  isLoading = false;
  private inventorySubs: Subscription;

  displayedColumns: string[] = [ 'pcode','pname','pdescription','pqty','pminqty',
    'stockid','unitprice','sellingprice','manudate','expdate','paymenttype','creditdue','supcode','supname','supnumber','supaddress','action'];
  dataSource : MatTableDataSource<ProductData>;
  
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private inventoryServices: InventoryServices, public dialog: MatDialog) {
    // Create 100 users
   // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(this.inventory);
  }

  
  ngOnInit() {
    this.isLoading = true;
    this.inventoryServices.getInventory();
    this.inventorySubs = this.inventoryServices.getInventoryUpdateListener()
      .subscribe((posts: ProductData[]) => {
        this.isLoading = false;
        this.inventory = posts; 
      
    this.dataSource = new MatTableDataSource(this.inventory);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; /* */
     });
  
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(PopupboxComponent, {
      width: '1020px',
      data:obj
    });
  

  dialogRef.afterClosed().subscribe(result => {
    if(result.event == 'Update'){
      this.updateRowData(result.data);
    }else if(result.event == 'Delete'){
      this.deleteRowData(result.data);
    }
  });
}

updateRowData(row_obj){
  this.inventoryServices.updateInventory(row_obj.id, row_obj.pname, row_obj.pdescription, row_obj.pqty, row_obj.pminqty, row_obj.stockid, row_obj.unitprice, row_obj.sellingprice,row_obj.manudate, row_obj.expdate, row_obj.paymenttype, row_obj.supcode, row_obj.creditdue, row_obj.supcode, row_obj.supname, row_obj.supnumber, row_obj.supaddress);
  this.dataSource.data = this.dataSource.data.filter((value,key)=>{
    if(value.id == row_obj.id){       // row_obj.id, row_obj.pname, row_obj.pdescription, row_obj.pqty, row_obj.pminqty, row_obj.stockid, row_obj.unitprice, row_obj.sellingprice 
      value.pcode = row_obj.pcode;
      value.pname = row_obj.pname;
      value.pdescription = row_obj.pdescription;
      value.pqty = row_obj.pqty;
      value.pminqty = row_obj.pminqty;
      value.stockid = row_obj.stockid;
      value.unitprice = row_obj.unitprice;
      value.sellingprice = row_obj.sellingprice;
      value.manudate = row_obj.manudate;           // row_obj.manudate, row_obj.expdate, row_obj.paymenttype, row_obj.supcode, row_obj.creditdue, row_obj.supcode, row_obj.supname, row_obj.supnumber, row_obj.supaddress
      value.expdate = row_obj.expdate;
      value.paymenttype = row_obj.paymenttype;
      value.creditdue = row_obj.creditdue;
      value.supcode = row_obj.supcode;
      value.supname = row_obj.supname;
      value.supnumber = row_obj.supnumber;
      value.supaddress = row_obj.supaddress;
    }
    return true;
  });
}

/*
deleteRowData(row_obj){
  this.dataSource.data = this.dataSource.data.filter((value,key)=>{
          return value.id != row_obj.id; 
  });
} */

deleteRowData(row_obj){
  this.inventoryServices.deleteInventory(row_obj.id);
  this.dataSource.data = this.dataSource.data.filter((value,key)=>{
    return value.id != row_obj.id; 
});
}



//this.inventoryServices.deleteInventory(row_obj.id);

}
