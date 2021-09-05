import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
//import { MatMenuModule } from '@angular/material/menu';
//import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatDividerModule } from '@angular/material/divider';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';;
import { InventoryComponent } from './home/inventory/inventory.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { BillingComponent } from './home/billing/billing.component';
import { StockComponent } from './home/inventory/stock/stock.component';;
import { BnfComponent } from './home/bnf/bnf.component';
import { ViewuserComponent } from './admin/viewuser/viewuser.component';
import { ProductlistingComponent } from './admin/productlisting/productlisting.component';
import { SupplierlistingComponent } from './admin/supplierlisting/supplierlisting.component';
import { PopupboxComponent } from './home/inventory/stock/popupbox/popupbox.component';
import { Popupbox1Component } from './admin/productlisting/popupbox1/popupbox1.component';;
import { NotificationComponent } from './home/notification/notification.component'


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        //MatMenuModule,
        //MatToolbarModule,
        MatPaginatorModule,
        MatSortModule,
        appRoutingModule,
        MatAutocompleteModule,
        PdfViewerModule,
        AutocompleteLibModule,
        MatDividerModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent,
        InventoryComponent,
        AdduserComponent ,
        BillingComponent ,
        StockComponent ,
        BnfComponent ,
        ViewuserComponent,
        ProductlistingComponent,
        SupplierlistingComponent,
        PopupboxComponent,
        Popupbox1Component
,
        NotificationComponent
               ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        
        // provider used to create fake backend
        fakeBackendProvider,
        
    ],

    entryComponents: [PopupboxComponent, Popupbox1Component],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    
    bootstrap: [AppComponent]
})

export class AppModule {  }