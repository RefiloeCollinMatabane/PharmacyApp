import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { InventoryComponent } from './home/inventory/inventory.component';
import { StockComponent } from './home/inventory/stock/stock.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { ViewuserComponent } from './admin/viewuser/viewuser.component';
import { ProductlistingComponent } from './admin/productlisting/productlisting.component';
import { SupplierlistingComponent } from './admin/supplierlisting/supplierlisting.component';
import { BillingComponent } from './home/billing/billing.component';
import { BnfComponent } from './home/bnf/bnf.component';
import { NotificationComponent } from './home/notification/notification.component';



const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'adduser',
        component: AdduserComponent,
        canActivate: [AuthGuard],
        data:{ roles: [Role.Admin] }
    },
    {
        path: 'viewuser',
        component: ViewuserComponent,
        canActivate: [AuthGuard],
        data:{ roles: [Role.Admin] }
    },
    {
        path: 'productlisting',
        component: ProductlistingComponent,
        canActivate: [AuthGuard],
        data:{ roles: [Role.Admin] }
    },
    {
        path: 'supplierlisting',
        component: SupplierlistingComponent,
        canActivate: [AuthGuard],
        data:{ roles: [Role.Admin] }
    },
    {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.User] }
    },
    {
        path: 'stock',
        component: StockComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.User] }
    },
    {
        path: 'billing',
        component: BillingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bnf',
        component: BnfComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'notification',
        component: NotificationComponent,
        canActivate: [AuthGuard]
    },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);