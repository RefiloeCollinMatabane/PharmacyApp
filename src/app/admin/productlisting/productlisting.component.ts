import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validator } from '@angular/forms';
import { ProductlistingService } from './productlisting.service';
import { MatTableDataSource, MatTable, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Popupbox1Component } from './popupbox1/popupbox1.component';
import { ProductData } from '../../../../backend/models/product.js';


@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrls: ['./productlisting.component.css']
})
export class ProductlistingComponent implements OnInit {

  searchTerm : string;
  product : ProductData[] = [];
  isLoading = false;
  private productSubs: Subscription;
  //private register: UserData[] = [];
  private productUpdated = new Subject<ProductData[]>();

  displayedColumns: string[] = [ 'pcode','pname','pdescription','pminqty','action'];
  dataSource : MatTableDataSource<ProductData>;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private productlistingservice: ProductlistingService, private http: HttpClient, private router: Router, public dialog: MatDialog ) { }

  ngOnInit() {
    this.isLoading = true;
    this.productlistingservice.getProduct();
    this.productSubs = this.productlistingservice.getProductUpdateListener()
      .subscribe((posts: ProductData[]) => {
        this.isLoading = false;
        this.product = posts; 
      
    this.dataSource = new MatTableDataSource(this.product);
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

  onAdding(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.productlistingservice.addProduct(form.value.pcode, form.value.pname, form.value.pdescription, form.value.pminqty);
    alert('Product added successfully!');
    form.resetForm();
  }

  updateRowData(row_obj){
    this.productlistingservice.updateProduct(row_obj.id, row_obj.pcode, row_obj.pname, row_obj.pdescription, row_obj.pminqty );
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.pcode = row_obj.pcode;
        value.pname = row_obj.pname;
        value.pdescription = row_obj.pdescription;
        value.pminqty = row_obj.pminqty;
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
    this.productlistingservice.deleteProduct(row_obj.id);
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      return value.id != row_obj.id; 
  });
  }


  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(Popupbox1Component, {
      width: '500px',
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

}
