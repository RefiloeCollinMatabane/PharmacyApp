import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Supplier } from '../../../../backend/models/supplier';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupplierlistingService {

  private supplierSubs: Subscription;
  private supplier: Supplier[] = [];
  private supplierUpdated = new Subject<Supplier[]>();

  constructor(private http: HttpClient, private router: Router) { }

  addSupplier(supcode: string, supname: string, supnumber: number, supaddress: string) {
    const supplier: Supplier = { supcode: supcode,supname: supname, supnumber: supnumber, supaddress: supaddress};
    this.http.post("http://localhost:3000/api/supplier/addsupplier", supplier)
     .subscribe(response  => {
         console.log(response);
     })
   }



   getSupplier(  ) { //itemsPerPage: number , currentPage:number
    //const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http.get<{message: string; suppliers: any}>('http://localhost:3000/api/supplier/showsuppliers' ) // + queryParams{message: string, inventorys: any}
    .pipe(map(Supplier => {
     return Supplier.suppliers.map(supplier => {
       return{  
        id: supplier._id,  //changed 
        supcode: supplier.supcode,
        supname: supplier.supname,
        supnumber: supplier.supnumber,
        supaddress: supplier.supaddress
        
       };
     });
    }))
    .subscribe((transformedSupplier)=>{
      this.supplier = transformedSupplier;
      this.supplierUpdated.next([...this.supplier])
      
    });
    
  } 

  getSupplierUpdateListener() {
    return this.supplierUpdated.asObservable();
  }






}
