import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

export interface UserData {
  email: string;
  name: string;
  address: string;
  telephone: number;
  role: string;

}


@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  searchTerm : string;
  register : UserData[] = [];
  isLoading = false;
  private registerSubs: Subscription;
  //private register: UserData[] = [];
  private registerUpdated = new Subject<UserData[]>();

  displayedColumns: string[] = [ 'email','name','address','telephone','role'];
  dataSource : MatTableDataSource<UserData>;

  constructor(private http: HttpClient, private router: Router) { }

  getUser(  ) { //itemsPerPage: number , currentPage:number
    this.http.get<{message: string; users: any}>('http://localhost:3000/api/user/showusers' ) // + queryParams{message: string, inventorys: any}
    .pipe(map(userData => {
     return userData.users.map(register => {
       return{  
        id: register._id,  //changed 
        email: register.email,
        name: register.name,
        address: register.address,
        telephone: register.telephone,
        role: register.role,
            
       };
     });
    }))
    .subscribe((transformedRegister)=>{
      this.register = transformedRegister;
      this.registerUpdated.next([...this.register])
      
    });
    
  }

  getRegisterUpdateListener() {
    return this.registerUpdated.asObservable();
  }

  ngOnInit() {
    
    this.isLoading = true;
    this.getUser();
    this.registerSubs = this.getRegisterUpdateListener()
      .subscribe((posts: UserData[]) => {
        this.isLoading = false;
        this.register = posts; 
      
    this.dataSource = new MatTableDataSource(this.register);
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort; /* */
    
     });


  }

}
