import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

interface Appointment {
  title: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule
  ]
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm!: FormGroup;
  originalAppointmentIndex: number | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });

    const editAppointment = JSON.parse(localStorage.getItem('editAppointment') || '{}');
    if (editAppointment && editAppointment.title) {
      this.appointmentForm.setValue({
        title: editAppointment.title,
        date: new Date(editAppointment.date),
        time: editAppointment.time
      });
      this.originalAppointmentIndex = this.findAppointmentIndex(editAppointment);
    }
  }

  findAppointmentIndex(appointmentToFind: Appointment): number | null { // Changed 'any' to 'Appointment'
    const appointments: Appointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');
    const index = appointments.findIndex(appointment => 
      appointment.title === appointmentToFind.title &&
      appointment.date === appointmentToFind.date &&
      appointment.time === appointmentToFind.time
    );
    return index !== -1 ? index : null;
  }

  saveAppointment(): void {
    if (this.appointmentForm.valid) {
      const appointments: Appointment[] = JSON.parse(localStorage.getItem('appointments') || '[]'); // Changed 'let' to 'const'

      if (this.originalAppointmentIndex !== null) {
        appointments[this.originalAppointmentIndex] = this.appointmentForm.value;
      } else {
        appointments.push(this.appointmentForm.value);
      }

      localStorage.setItem('appointments', JSON.stringify(appointments));
      this.router.navigate(['/calendar']);
    }
  }
}
