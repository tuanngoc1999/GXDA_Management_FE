import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  @Input() studentData: Student | null = null; // Handle Student or null
  @Input() isNewStudent: boolean = false; // Determine if this is a new student
  studentForm!: FormGroup; // FormGroup declaration

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentForm = this.fb.group({
      id: [this.studentData?.id || 0],
      holyName: [this.studentData?.holyName || '', Validators.required],
      firstName: [this.studentData?.firstName || '', Validators.required],
      lastName: [this.studentData?.lastName || '', Validators.required],
      birthDate: [this.studentData?.birthDate ? new Date(this.studentData.birthDate) : null, Validators.required],
      address: [this.studentData?.address || ''],
      contact: [this.studentData?.contact || ''],
      dad: [this.studentData?.dad || ''],
      mom: [this.studentData?.mom || ''],
      note: [this.studentData?.note || ''],
      sacramentBaptismDate: [this.studentData?.sacramentBaptism?.split("*")[0] || ''],
      sacramentBaptismParish: [this.studentData?.sacramentBaptism?.split("*")[1] || ''],
      sacramentFirstConfessionDate: [this.studentData?.sacramentFirstConfession?.split("*")[0] || ''],
      sacramentFirstConfessionParish: [this.studentData?.sacramentFirstConfession?.split("*")[1] || ''],
      sacramentConfirmationDate: [this.studentData?.sacramentConfirmation?.split("*")[0] || ''],
      sacramentConfirmationParish: [this.studentData?.sacramentConfirmation?.split("*")[1] || ''],
      addedDate: [this.studentData?.addedDate ? new Date(this.studentData.addedDate) : new Date()],
      createdBy: [this.studentData?.createdBy || 0],
      updatedBy: [this.studentData?.updatedBy || 0],
      classId: [this.studentData?.classId || 0]
    });
  }
}
