import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent},
  { path: 'order', component: OrderEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
