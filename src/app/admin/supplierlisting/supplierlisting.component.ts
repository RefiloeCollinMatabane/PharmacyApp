import { Component, OnInit } from '@angular/core';
import { NgForm, Validator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTable, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { SupplierlistingService } from './supplierlisting.service';
import { SupplierData } from '../../../../backend/models/supplier';

@Component({
  selector: 'app-supplierlisting',
  templateUrl: './supplierlisting.component.html',
  styleUrls: ['./supplierlisting.component.css']
})
export class SupplierlistingComponent implements OnInit {

  searchTerm : string;
  supplier : SupplierData[] = [];
  isLoading = false;
  private supplierSubs: Subscription;
  //private register: UserData[] = [];
  private supplierUpdated = new Subject<SupplierData[]>();

  constructor( private supplierlistingservice: SupplierlistingService, private http: HttpClient, private router: Router, public dialog: MatDialog ) { }

  ngOnInit() {
    this.isLoading = true;
    this.supplierlistingservice.getSupplier();
    this.supplierSubs = this.supplierlistingservice.getSupplierUpdateListener()
      .subscribe((products: SupplierData[]) => {
        this.isLoading = false;
        this.supplier = products;
      
      });
  }




  onAdding(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.supplierlistingservice.addSupplier(form.value.supcode, form.value.supname, form.value.supnumber, form.value.supaddress);
    alert('Supplier added successfully!');
    form.resetForm();
  }

}
