import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';


import { InventoryServices } from './inventory.service';
import { ProductlistingService } from '../../admin/productlisting/productlisting.service';

import { Products } from '../../../../backend/models/product.js';
import { Product } from './product.model';
import { Supplier } from '../../../../backend/models/supplier';
import { SupplierlistingService } from '@app/admin/supplierlisting/supplierlisting.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  showDateInput = false;
  minDate = new Date();
  maxDate = new Date();

  radioValueCheck(x) {
    this.showDateInput = (x === 2);
  }

  product: Product[] = [];
  private productSubs: Subscription;
  private supplierSubs: Subscription; 

  myControl = new FormControl();
  options: any[] = [ ]; //       string[]      'One', 'Two', 'Three'
  filteredOptions: Observable<any[]>; // string[]
  isLoading = false;
  optionsForm: FormGroup;

  pcode = '';
  supcode = '';
  public selects = [];
  public selects2 = [];
  public placeholder: string = 'Product Code';
  public placeholder2: string = 'Supplier Code';
  public keyword = 'pcode';
  public keyword2 = 'supcode';
  public historyHeading: string = 'Recently selected';
  public historyHeading2: string = 'Recently selected';

  constructor(public inventoryServices: InventoryServices, public productlistingservices: ProductlistingService,public supplierlistingservice: SupplierlistingService, private fb: FormBuilder) { }

  ngOnInit() {
    this.productlistingservices.getProduct();
    this.productSubs = this.productlistingservices.getProductUpdateListener()
      .subscribe((products: Product[]) => {
        this.selects = products;
        console.log(this.selects);
      })

    this.supplierlistingservice.getSupplier();
    this.supplierSubs = this.supplierlistingservice.getSupplierUpdateListener()
      .subscribe((suppliers: Supplier[]) => {
        this.selects2 = suppliers;
        console.log(this.selects2);
      })  

    this.optionsForm = this.fb.group({
      optionInput: null
    })

    this.optionsForm
      .get('optionInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.inventoryServices.search({ pcode: value }, 1)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe((options) => {
        this.filteredOptions = options.results})

       console.log(this.options);
      
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    // );

  }


  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  selectItem() {
    this.productlistingservices.getProduct();
    return { id: this.product }
  }

  onAddProduct(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.inventoryServices.addProduct(
      form.value.pcode,
      form.value.supcode,
      form.value.pname,
      form.value.supname,
      form.value.pdescription,
      form.value.supnumber,
      form.value.pqty,
      form.value.pminqty,
      form.value.supaddress,
      form.value.stockid,
      form.value.unitprice,
      form.value.sellingprice,
      form.value.manudate,
      form.value.expdate,
      form.value.paymenttype,
      form.value.creditdue);
    alert('Inventory Successfully added!');
    form.resetForm();
  }

   
  selectEvent(item) {
    // do something with selected item

  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }





}
