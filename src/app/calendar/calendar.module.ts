import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: CalendarViewComponent }
    ])
  ]
})
export class CalendarModule {}
