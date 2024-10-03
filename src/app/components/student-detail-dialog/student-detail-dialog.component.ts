import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService, Student, Class, Block, BlockService, CreateStudentDto } from '../../services/student.service';

@Component({
  selector: 'app-student-detail-dialog',
  templateUrl: './student-detail-dialog.component.html',
  styleUrls: ['./student-detail-dialog.component.css']
})
export class StudentDetailDialogComponent implements OnInit {
  isNewStudent: boolean;
  blocks: Block[] = [];
  classes: Class[] = [];
  selectedBlockId?: number | null = null;
  selectedClassId: number | null = null;

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
    private studentService: StudentService,
    private blockService: BlockService,
    public dialogRef: MatDialogRef<StudentDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { student: Student | null }
  ) {
    this.isNewStudent = data.student === null;
    this.student.id = data.student === null ? 0 : data.student.id;
    this.selectedClassId = data.student?.classId || null;
  }


  ngOnInit(): void {
    this.loadBlocks();
  }

  private loadBlocks(): void {
    this.blockService.getBlocksDetail().subscribe(
      (data) => {
        if (!this.isNewStudent && this.selectedClassId) {
          for (const block of data) {
            const matchingClass = block.classes?.find(cls => cls.id === this.selectedClassId);
            if (matchingClass) {
              this.selectedBlockId = matchingClass.block?.id;
              this.classes = block.classes!;
              break;
            }
          }
        }
        this.blocks = data;
      },
      (error) => {
        console.error('Error fetching blocks:', error);
      }
    );
  }

  onBlockChange(blockId: number): void {
    this.selectedBlockId = blockId;
    this.selectedClassId = null;
    var block = this.blocks.find(x => x.id == blockId);
    if (block && block.classes) this.classes = block.classes;
  }

  onClassChange(classId: number): void {
    this.selectedClassId = classId;
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
        classId: this.selectedClassId!
      }
      if (this.isNewStudent) {
        this.studentService.addStudent(student).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error adding student:', error);
          }
        );
      } else {
        this.studentService.updateStudent(student, this.student.id).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating student:', error);
          }
        );
      }
    }
  }

  deleteStudent(studentId: number): void {
    this.studentService.deleteStudent(studentId).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (error) => {
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
