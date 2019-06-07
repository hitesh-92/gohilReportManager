import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-overview',
  templateUrl: './main-overview.component.html',
  styleUrls: ['./main-overview.component.css']
})

export class MainOverviewComponent {
  /** Based on the screen size, switch from standard to one column per row */

  data = { left:1, center:2, right:3 }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Current Articles', cols: 2, rows: 1, left: 'omg omg' },
          { title: 'Card 2', cols: 2, rows: 1, color: 'red' },
          { title: 'Card 3', cols: 2, rows: 1, color: 'green' },
          { title: 'Card 4', cols: 2, rows: 1, color: 'blue' }
        ];
      }

      return [
        { title: 'Current Articles', cols: 2, rows: 1 },
        { title: 'Alerts', cols: 1, rows: 1 },
        { title: 'Add Alert', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 2, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
