import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Stock } from '../../../../backend/models/stock.js';


@Injectable({
  providedIn: 'root'
})


export class BillingService {


  private productSubs: Subscription;
  private item: Stock[] = [];
  private itemUpdated = new Subject<Stock[]>();


  constructor(private http: HttpClient, private router: Router) { }


  getItems( ) { //itemsPerPage: number , currentPage:number
    //const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http.get<{message: string; items: any}>('http://localhost:3000/api/stock/getitems' ) // + queryParams{message: string, inventorys: any}
    .pipe(map(itemData => {
     return itemData.items.map(item => {
       return{  
        id: item._id,  //changed 
        icode: item.icode,
        iname: item.iname,
        idescription: item.idescription,
        uprice: item.uprice
        
       };
     });
    }))
    .subscribe((transformedProduct)=>{
      this.item = transformedProduct;
      this.itemUpdated.next([...this.item])
      
    });  
  } 


  getItemUpdateListener() {
    return this.itemUpdated.asObservable();
  }
  




}
