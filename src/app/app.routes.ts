import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./calendar/appointment-form/appointment.module').then(m => m.AppointmentModule)
  },
  { path: '**', redirectTo: '/calendar' }
];
