import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { Product } from '../../../../backend/models/product.js';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductlistingService {

  private productSubs: Subscription;
  private product: Product[] = [];
  private productUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router) { }

  addProduct(pcode: string, pname: string, pdescription: string, pminqty: string) {
    const product: Product = { pcode: pcode, pname: pname, pdescription: pdescription, pminqty: pminqty};
    this.http.post("http://localhost:3000/api/product/addproduct", product)
     .subscribe(response  => {
         console.log(response);
     })
   }


   getProduct(  ) { //itemsPerPage: number , currentPage:number
    //const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http.get<{message: string; products: any}>('http://localhost:3000/api/product/showproducts' ) // + queryParams{message: string, inventorys: any}
    .pipe(map(productData => {
     return productData.products.map(product => {
       return{  
        id: product._id,  //changed 
        pcode: product.pcode,
        pname: product.pname,
        pdescription: product.pdescription,
        pminqty: product.pminqty
        
       };
     });
    }))
    .subscribe((transformedProduct)=>{
      this.product = transformedProduct;
      this.productUpdated.next([...this.product])
      
    });
    
  } 

  getProductUpdateListener() {
    return this.productUpdated.asObservable();
  }



  updateProduct( id: string, pcode: string, pname: string, pdescription: string, pminqty: number ){
     let product: Product | FormData;
     product = { pcode: pcode, pname: pname, pdescription: pdescription, pminqty: pminqty}; 
        this.http.put('http://localhost:3000/api/product/' + id , product)
             .subscribe((response :any) => {
               const updatedProducts = [...this.product];
               const oldProductIndex = updatedProducts.findIndex(i => i.id === id);
               const product : Product = {  pcode: pcode, pname: pname, pdescription: pdescription, pminqty: pminqty};
               updatedProducts[oldProductIndex] = product;
               this.productUpdated.next([...this.product]);
               this.router.navigate(["/productlisting"]);
             });
  }


  deleteProduct(productId: string) {
    this.http.delete('http://localhost:3000/api/product/' + productId)
      .subscribe(() =>{
        const productUpdated = this.product.filter(product => product.id !== productId);
        this.product = productUpdated;
        this.productUpdated.next([...this.product])
      });
  }


}
