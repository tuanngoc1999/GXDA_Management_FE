import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService, Student } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationSection, RegistrationSectionService, CreateStudentDto } from '../../services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  guid: string | null = null;

  studentForm!: FormGroup;
  isNewStudent: boolean = true;
  student: Student = {
    id: 0,
    holyName: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    contact: '',
    dad: '',
    mom: '',
    note: '',
    createdBy: 0,
    updatedBy: 0,
    classId: 0,
    sacramentBaptism: '',
    sacramentFirstConfession: '',
    sacramentConfirmation: '',
    addedDate: ''
  };

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private registrationSectionService: RegistrationSectionService,
    // private registrationProcessingService: RegistrationProcessingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.initializeForm();

    this.route.paramMap.subscribe(params => {
      this.guid = params.get('guid');
    });
    var registrationSection = await this.registrationSectionService.getRegistrationSection(this.guid!);
    if (registrationSection.guid) {
      // this.route.params.subscribe(params => {
      //   const studentId = +params['id'];
      //   if (studentId) {
      //     this.isNewStudent = false;
      //     this.studentService.getStudentById(studentId).subscribe(student => {
      //       this.studentForm.patchValue(student);
      //     });
      //   }
      // });
    }
  }

  private initializeForm(): void {
    this.studentForm = this.fb.group({
      id: [0],
      holyName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [null, Validators.required],
      address: [''],
      contact: [''],
      dad: [''],
      mom: [''],
      note: [''],
      sacramentBaptism: [''],
      sacramentFirstConfession: [''],
      sacramentConfirmation: [''],
      addedDate: [new Date()],
      updatedDate: [new Date()],
      createdBy: [0],
      updatedBy: [0],
      classId: [0]
    });
  }

  save(studentForm: any): void {
    if (studentForm.valid) {
      var formValue = studentForm.value;
      var student: CreateStudentDto = {
        holyName: formValue.holyName,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        birthDate: formValue.birthDate,
        address: formValue.address,
        contact: formValue.contact,
        dad: formValue.dad,
        mom: formValue.mom,
        note: formValue.note,
        sacramentBaptism: formValue.sacramentBaptismDate + "*" + formValue.sacramentBaptismParish,
        sacramentFirstConfession: formValue.sacramentFirstConfessionDate + "*" + formValue.sacramentFirstConfessionParish,
        sacramentConfirmation: formValue.sacramentConfirmationDate + "*" + formValue.sacramentConfirmationParish,
      }
      this.studentService.regist(student).subscribe(
        () => {

        },
        (error) => {
          console.error('Error adding student:', error);
        }
      );

    }
  }
}
