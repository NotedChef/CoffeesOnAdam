import { AdminGuard } from './auth/admin.guard';
import { UserService } from './user/user.service';
import { OrderDetailFullComponent } from './order/order-detail-full/order-detail-full.component';
import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './auth/auth.service';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderService } from './order/order.service';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AllOrdersListComponent } from './order/all-orders-list/all-orders-list.component';
import { SummarizePipe } from './order/summarize.pipe';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { DeleteConfirmationDialogComponent } from './order/delete-confirmation-dialog/delete-confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    OrderEditComponent,
    OrderListComponent,
    OrderDetailComponent,
    HomeComponent,
    AllOrdersListComponent,
    OrderDetailFullComponent,
    SummarizePipe,
    UserListComponent,
    UserDetailComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  entryComponents: [DeleteConfirmationDialogComponent],
  providers: [AuthService, OrderService, UserService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
