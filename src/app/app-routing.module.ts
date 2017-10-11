import { AdminGuard } from './auth/admin.guard';
import { AllOrdersListComponent } from './order/all-orders-list/all-orders-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent},
  { path: 'order', component: OrderEditComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: AllOrdersListComponent, canActivate: [AuthGuard] },
  { path: 'admins', component: UserListComponent, canActivate: [AdminGuard] },

  { path: '**', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
