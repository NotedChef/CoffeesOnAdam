import { AuthService } from './../../auth/auth.service';
import { DeleteConfirmationDialogComponent } from './../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
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
  // orderListSummary$: any;
  orders$: FirebaseListObservable<Order[]>;


  constructor(private orderService: OrderService, public dialog: MdDialog, public authService: AuthService) { }

  ngOnInit() {
    this.orders$ = this.orderService.getOrdersList({
      orderByChild: 'name'
    });
    this.orders$.subscribe(
      order => this.numOrders = order.length
    );
    // DO NOT DELETE - TODO: - going to move this to the service and use instead of summarize pipe
    // this.orders$.forEach(order => console.log(order));
    // this.orderListSummary$ = this.orders$ as Observable<any[]>;
    // this.orderListSummary$
      /// need to add something here to get the array into it's own observable - Observable.from([])
    //   .map(order => order[0].summary);
      // .groupBy(order => order.summary)
      // .mergeMap(group => group.reduce((acc, curr) =>
      //     [...acc, ...curr], []
      // ));
    //   .map(val => val.length + ' X ' + val[0].summary);
    // this.orderListSummary$.forEach(item => console.log(item));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if (result) {
        this.orders$.remove()
          .then(_ => console.log('Deleted all orders'))
          .catch(error => console.log('Error deleting all orders: ', error));
      }
    });




  }

}
