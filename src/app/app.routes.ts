import { Routes } from '@angular/router';
import { CalendarViewComponent } from './calendar/calendar-view/calendar-view.component';
import { AppointmentFormComponent } from './calendar/appointment-form/appointment-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/calendar', pathMatch: 'full' },
    { path: 'calendar', component: CalendarViewComponent },
    { path: 'appointment', component: AppointmentFormComponent },
    { path: '**', redirectTo: '/calendar' }
];