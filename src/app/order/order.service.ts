import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database';
import { Order } from './order';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/mergeMap';
import * as _ from 'lodash';
import { groupBy } from 'rxjs/operator/groupBy';

@Injectable()
export class OrderService {
  subject$ = new BehaviorSubject<string>(undefined);
  orders$: FirebaseListObservable<Order[]> = null;
  order$: FirebaseObjectObservable<Order> = null;
  private basePath = '/Orders';

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  // Create a brand new order
  createOrder(order: Order): void {
    this.orders$.push(order).catch(error => this.handleError(error));
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getOrdersList(query = {}): FirebaseListObservable<Order[]> {
    this.orders$ = this.db.list('/Orders', {
      query: query
    });
    return this.orders$;
  }

  getOrdersSummaryList(): Observable<any[]> {
    // console.log('In getOrdersSummaryList()');
    const allOrders$: FirebaseListObservable<Order[]> = this.getOrdersList({
      orderByChild: 'name'
    });

    const res$ = allOrders$.switchMap(orders => {
      if (orders !== null) {
        const mapGroup = new Map();
        orders.forEach(order => {
          const key = order.summary;
          const count = mapGroup.get(key);
          if (!count) {
            mapGroup.set(key, 1);
          } else {
            mapGroup.set(key, count + 1);
          }
        });
        // convert map to array an sort in reverse
        let summaryArray = [];
        const retArray = [];
        mapGroup.forEach((itemCount, key) =>
          summaryArray.push({
            summary: key,
            value: itemCount
          })
        );
        summaryArray = _.orderBy(summaryArray, ['value']).reverse();

        // create array of summary objects to be returned
        for (const item of summaryArray) {
          retArray.push({
            summary: item.value + ' X ' + item.summary
          });
        }
        return Observable.of(retArray);
      } else {
        return Observable.of(null);
      }
    });
    // res$.subscribe(orders => console.log(orders));
    return res$;
    // TODO: - can summary be done with just with observables??
      /// need to add something here to get the array into it's own observable - Observable.from([])
    //   .map the objects in the array to just {summary: ''}
      // .groupBy(order => order.summary)
      // .mergeMap(group => group.reduce((acc, curr) =>
      //     [...acc, ...curr], []
      // ));
    //   .map(val => val.length + ' X ' + val[0].summary);

  }

  getOrdersByUserId(): FirebaseListObservable<Order[]> {
    this.orders$ = this.db.list('/Orders', {
      query: {
        orderByChild: 'uid',
        equalTo: this.subject$
      }
    });
    return this.orders$;
  }

  // Return a single observable item
  getOrder(key: string): FirebaseObjectObservable<Order> {
    const orderPath = `${this.basePath}/${key}`;
    this.order$ = this.db.object(orderPath);
    return this.order$;
  }

  updateOrder(key: string, value: any): void {
    this.orders$.update(key, value).catch(error => this.handleError(error));
  }

  removeOrder(key: string): void {
    this.orders$.remove(key).catch(error => this.handleError(error));
  }

  removeAll(): void {
    this.order$.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
