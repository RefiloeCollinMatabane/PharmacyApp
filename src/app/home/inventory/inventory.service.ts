import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from '../../../../backend/models/product.js';
import { resetFakeAsyncZone } from '@angular/core/testing';


@Injectable({ providedIn: 'root' })
export class InventoryServices {
  private inventory: Product[] = [];
  private inventoryUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router) { }

  /*  getProduct(){
        return [...this.inventory];
    }  */

  /* */
  getInventory() { //itemsPerPage: number , currentPage:number
    //const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string; products: any }>('http://localhost:3000/api/inventory/showproducts') // + queryParams{message: string, inventorys: any}
      .pipe(map(inventoryData => {
        return inventoryData.products.map(inventory => {
          return {
            id: inventory._id,  //changed 
            pcode: inventory.pcode,
            supcode: inventory.supcode,
            pname: inventory.pname,
            supname: inventory.supname,
            pdescription: inventory.pdescription,
            supnumber: inventory.supnumber,
            pqty: inventory.pqty,
            pminqty: inventory.pminqty,
            supaddress: inventory.supaddress,
            stockid: inventory.stockid,
            unitprice: inventory.unitprice,
            sellingprice: inventory.sellingprice,
            manudate: inventory.manudate,
            expdate: inventory.expdate,
            paymenttype: inventory.paymenttype,
            creditdue: inventory.creditdue
          };
        });
      }))
      .subscribe((transformedInventory) => {
        this.inventory = transformedInventory;
        this.inventoryUpdated.next([...this.inventory])

      });

  }

  getInventoryUpdateListener() {
    return this.inventoryUpdated.asObservable();
  }

  getInventorys(id: string) {
    return this.http.get<{
      _id: string, pcode: string, supcode: string, pname: string, supname: string, pdescription: string, supnumber: number,
      pqty: number, pminqty: number, supaddress: string, stockid: string, unitprice: number, sellingprice: number,
      manudate: Date, expdate: Date, paymenttype: string, creditdue: Date
    }>
      ('http://localhost:3000/api/inventory/showproducts' + id);
  }


  addProduct(pcode: string, supcode: string, pname: string, supname: string, pdescription: string, supnumber: number,
    pqty: number, pminqty: number, supaddress: string, stockid: string, unitprice: number, sellingprice: number,
    manudate: Date, expdate: Date, paymenttype: string, creditdue: Date) {
    const product: Product = {
      pcode: pcode, supcode: supcode, pname: pname, supname: supname, pdescription: pdescription, supnumber: supnumber,
      pqty: pqty, pminqty: pminqty, supaddress: supaddress, stockid: stockid, unitprice: unitprice, sellingprice: sellingprice,
      manudate: manudate, expdate: expdate, paymenttype: paymenttype, creditdue: creditdue
    };
    this.http.post("http://localhost:3000/api/inventory/addproduct", product)
      .subscribe(response => {
        console.log(response);

      })

  }


  updateInventory(id: string, pcode: string, supcode: string, pname: string, supname: string, pdescription: string, supnumber: number,
    pqty: number, pminqty: number, supaddress: string, stockid: string, unitprice: number, sellingprice: number,
    manudate: Date, expdate: Date, paymenttype: string, creditdue: Date) {
    let inventory: Product | FormData;
    inventory = {
      pcode: pcode, supcode: supcode, pname: pname, supname: supname, pdescription: pdescription, supnumber: supnumber,
      pqty: pqty, pminqty: pminqty, supaddress: supaddress, stockid: stockid, unitprice: unitprice, sellingprice: sellingprice,
      manudate: manudate, expdate: expdate, paymenttype: paymenttype, creditdue: creditdue
    };
    this.http.put('http://localhost:3000/api/inventory/' + id, inventory)
      .subscribe((response: any) => {
        const updatedInventorys = [...this.inventory];
        const oldInventoryIndex = updatedInventorys.findIndex(i => i.id === id);
        const inventory: Product = {
          pcode: pcode, supcode: supcode, pname: pname, supname: supname, pdescription: pdescription,
          supnumber: supnumber, pqty: pqty, pminqty: pminqty, supaddress: supaddress, stockid: stockid, unitprice: unitprice,
          sellingprice: sellingprice, manudate: manudate, expdate: expdate, paymenttype: paymenttype, creditdue: creditdue
        };
        updatedInventorys[oldInventoryIndex] = inventory;
        this.inventoryUpdated.next([...this.inventory]);
        this.router.navigate(["/stock"]);
      });
  }


  deleteInventory(inventoryId: string) {
    this.http.delete('http://localhost:3000/api/inventory/' + inventoryId)
      .subscribe(() => {
        const inventoryUpdated = this.inventory.filter(inventory => inventory.id !== inventoryId);
        this.inventory = inventoryUpdated;
        this.inventoryUpdated.next([...this.inventory])
      });
  }



  search(filter: { pcode: string } = { pcode: '' }, page = 1): Observable<Product> {
    return this.http.get<{ message: string; products: any }>('http://localhost:3000/api/product/showproducts')
      .pipe(
        tap((response: Product) => {
          response.results = response.results
            .map(product => new Product(product.id, product.pcode, product.pname, product.pdescription, product.pminqty))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(product => product.pcode.includes(filter.pcode))

          return response;
        })
      );
  }


  /* 

   if (typeof(image)==='object'){
         inventoryData = new FormData();
         inventoryData.append("id", id);
         inventoryData.append("name",name);
         inventoryData.append("quantity",quantity);
         inventoryData.append("batchId",batchId);
         inventoryData.append("expireDate",expireDate);
         inventoryData.append("price",price);
         inventoryData.append("image", image, name);
   
       } else{
   */



}