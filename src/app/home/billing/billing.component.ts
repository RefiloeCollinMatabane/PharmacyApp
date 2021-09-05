import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
//import { map, startWith } from 'rxjs/operators';
import { Transaction } from '../../../../backend/models/product'
import { BillingService } from './billing.service';
// import { Stock } from '../../../../backend/models/stock';



 export interface Stock {

    icode: string;
    iname: string;
    idescription: string;
    qty: number;
    uprice: number;
    nprice: number;
 }


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit, OnDestroy {

  transactions: Transaction[] = [];
  stock: Stock[] = [];
  private itemSubs: Subscription;
  myControl = new FormControl();
  public options: any[] = [ ]; //'One', 'Two', 'Three'
  filteredOptions: Observable<string[]>;

  displayedColumns = ['count', 'icode', 'iname', 'idescription', 'qty', 'uprice', 'nprice'];

  constructor( public billingservice: BillingService ) {}

  ngOnInit() {
   
    this.billingservice.getItems();
    this.itemSubs = this.billingservice.getItemUpdateListener()
        .subscribe((stock: Stock[]) => {
           this.options = stock; 
           console.log(this.options);

       

     });
   
      
          
  }

  //  this.billingservice.getItems();
    //  this.itemSubs = this.billingservice.getItemUpdateListener()
    //    .subscribe((items: Transaction[]) => {
    //      this.transactions = items;
    //      console.log(this.transactions);
    //    }) 

         
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  } 
 
  // optionItems(){
  //   this.billingservice.getItems();
  //   return this.itemSubs 
  // }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }


  addtolist(selectItems) {
    let values = selectItems.value;
    // console.log(values);
    let obj:any [] = []; 
    obj = [{
       icode: String = values.pcode ,
       iname: String =values.pname ,
       idescription: String =values.pdescription,
       qty: Number =values.pqty ,
       nprice: Number = values.price }] ;
   
    this.transactions = this.transactions.concat(obj);
    console.log(this.transactions);
    //   this.transactions.push(obj); 
    selectItems.reset();
  }


  


    ngOnDestroy(){
      this.itemSubs.unsubscribe();
    }

}
