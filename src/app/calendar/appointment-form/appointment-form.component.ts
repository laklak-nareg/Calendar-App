import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule // Import the time picker module here
  ]
})
export class AppointmentFormComponent implements OnInit {
  appointment = { title: '', date: '', time: '' };
  originalAppointmentIndex: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const editAppointment = JSON.parse(localStorage.getItem('editAppointment') || '{}');
    if (editAppointment && editAppointment.title) {
      this.appointment = editAppointment;
      this.originalAppointmentIndex = this.findAppointmentIndex(editAppointment);
    }
  }

  findAppointmentIndex(appointmentToFind: any): number | null {
    const appointments: { title: string, date: string, time: string }[] = JSON.parse(localStorage.getItem('appointments') || '[]');
    const index = appointments.findIndex(appointment => 
      appointment.title === appointmentToFind.title &&
      appointment.date === appointmentToFind.date &&
      appointment.time === appointmentToFind.time
    );
    return index !== -1 ? index : null;
  }

  saveAppointment(): void {
    let appointments: { title: string, date: string, time: string }[] = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    if (this.originalAppointmentIndex !== null) {
      appointments[this.originalAppointmentIndex] = this.appointment; // Update the existing appointment
    } else {
      appointments.push(this.appointment); // Add a new appointment
    }

    localStorage.setItem('appointments', JSON.stringify(appointments));
    this.appointment = { title: '', date: '', time: '' };
    this.router.navigate(['/calendar']);
  }
}
