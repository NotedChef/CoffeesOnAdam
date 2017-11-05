import { AuthService } from './../../auth/auth.service';
import { DeleteConfirmationDialogComponent } from './../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-all-orders-list',
  templateUrl: './all-orders-list.component.html',
  styleUrls: ['./all-orders-list.component.css']
})
export class AllOrdersListComponent implements OnInit {
  numOrders: number;
  ordersSummaryList$: Observable<Order[]>;
  orders$: FirebaseListObservable<Order[]>;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.orders$ = this.orderService.getOrdersList({
      orderByChild: 'name'
    });
    this.orders$.subscribe(order => (this.numOrders = order.length));
    this.ordersSummaryList$ = this.orderService.getOrdersSummaryList();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if (result) {
        this.orders$
          .remove()
          .then(_ => console.log('Deleted all orders'))
          .catch(error => console.log('Error deleting all orders: ', error));
      }
    });
  }
}
