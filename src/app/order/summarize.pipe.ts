import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'summarize'
})
export class SummarizePipe implements PipeTransform {

  transform(orders: any, args?: any): any {
    // groupBy order.summary and do a count, return array of objects with summary: 'Count X summary'
    const map = new Map();

    // extract array of order objects in a map of summary and counts
    if (orders !== null) {
      orders.forEach(order => {
        const key = order.summary;
        const count = map.get(key);
        if (!count) {
          map.set(key, 1);
        } else {
          map.set(key, count + 1);
        }
      });
    }

    // convert map to array an sort in reverse
    let summaryArray = [];
    const retArray = [];
    map.forEach((itemCount, key) => summaryArray.push( {
      summary: key,
      value: itemCount
    }) );
    summaryArray = _.orderBy(summaryArray, ['value']).reverse();

    // create array of summary objects to be returned
    for (const item of summaryArray) {
      retArray.push({
        summary: item.value + ' X ' + item.summary
      });
    }

    return retArray;
  }

}
