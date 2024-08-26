import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule
  ]
})
export class CalendarViewComponent implements OnInit {
  days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  appointments: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    this.appointments = storedAppointments;
  }

  getAppointmentsForDay(day: string): any[] {
    return this.appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toLocaleDateString('en-US', { weekday: 'long' }) === day;
    });
  }

  deleteAppointment(appointmentToDelete: any): void {
    this.appointments = this.appointments.filter(appointment => appointment !== appointmentToDelete);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  editAppointment(appointmentToEdit: any): void {
    localStorage.setItem('editAppointment', JSON.stringify(appointmentToEdit));
    this.router.navigate(['/appointment']);
  }

  openAppointmentForm(): void {
    localStorage.removeItem('editAppointment'); // Clear edit state when adding a new appointment
    this.router.navigate(['/appointment']);
  }
}
