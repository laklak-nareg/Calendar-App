import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef } from '@angular/core';

interface Appointment {
  title: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    DragDropModule
  ]
})
export class CalendarViewComponent implements OnInit {
  days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  appointments: Appointment[] = [];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAppointments();
  
    // Manually reorder items
    if (this.appointments.length > 1) {
      const temp = this.appointments[0];
      this.appointments[0] = this.appointments[1];
      this.appointments[1] = temp;
      console.log('Manually reordered appointments:', this.appointments);
    }
  }

  loadAppointments(): void {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    this.appointments = storedAppointments.map((appointment: Appointment) => ({
      ...appointment,
      date: new Date(appointment.date).toISOString() // Ensure date is a string
    }));
  }

  getAppointmentsForDay(day: string): Appointment[] {
    return this.appointments
      .filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate.toLocaleDateString('en-US', { weekday: 'long' }) === day;
      })
      .sort((a, b) => this.compareTimes(a.time, b.time));
  }

  compareTimes(timeA: string, timeB: string): number {
    const dateA = this.parseTimeToDate(timeA);
    const dateB = this.parseTimeToDate(timeB);
    return dateA.getTime() - dateB.getTime();
  }

  parseTimeToDate(time: string): Date {
    const [hourMinute, period] = time.split(' ');
    const [hours, minutes] = hourMinute.split(':').map(Number);  // Changed 'let' to 'const' for 'minutes'

    let adjustedHours = hours;
    if (period === 'PM' && adjustedHours !== 12) {
      adjustedHours += 12;
    } else if (period === 'AM' && adjustedHours === 12) {
      adjustedHours = 0;
    }

    const now = new Date();
    now.setHours(adjustedHours, minutes, 0, 0);
    return now;
  }

  deleteAppointment(appointmentToDelete: Appointment): void {
    this.appointments = this.appointments.filter(appointment => appointment !== appointmentToDelete);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  editAppointment(appointmentToEdit: Appointment): void {
    localStorage.setItem('editAppointment', JSON.stringify(appointmentToEdit));
    this.router.navigate(['/appointment']);
  }

  drop(event: CdkDragDrop<Appointment[]>): void {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
  
    console.log('Previous Index:', previousIndex);
    console.log('Current Index:', currentIndex);
  
    if (previousIndex !== currentIndex) {
      const movedItem = this.appointments[previousIndex];
  
      // Remove the item from its original position
      this.appointments.splice(previousIndex, 1);
  
      // Insert the item in its new position
      this.appointments.splice(currentIndex, 0, movedItem);
  
      console.log('Appointments after manual move:', this.appointments);
  
      // Update local storage
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  trackById(index: number, item: Appointment): string {
    return item.title; // Use a unique property of the appointment
  }

  openAppointmentForm(): void {
    localStorage.removeItem('editAppointment');
    this.router.navigate(['/appointment']);
  }
}
