import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail-full',
  templateUrl: './order-detail-full.component.html',
  styleUrls: ['./order-detail-full.component.css']
})
export class OrderDetailFullComponent implements OnInit {
  @Input() order: Order;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

}
