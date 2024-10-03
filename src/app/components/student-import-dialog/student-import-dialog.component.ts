import { Component, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateStudentDto, StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-import-dialog',
  templateUrl: './student-import-dialog.component.html',
  styleUrls: ['./student-import-dialog.component.css']
})
export class StudentImportDialogComponent {

  students: CreateStudentDto[] = [];
  errorRecords: number[] = [];
  fileLoaded: boolean = false;
  classId: number = this.data.classId | 0;
  
  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<StudentImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { classId: number}) {}

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
  
    if (target.files.length !== 1) {
      throw new Error('Cannot upload multiple files');
    }
  
    const reader: FileReader = new FileReader();
  
    reader.onload = (e: any) => {
      const binaryStr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });
  
      const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data: any[] = XLSX.utils.sheet_to_json(worksheet);
  
      this.fileLoaded = false;
  
      this.students = data.map((row: any, index: number) => {
        
        const isValid = this.validateStudent(row, index);
  
        if (!isValid) {
          this.errorRecords.push(index + 1);
        }
  
        return {
          holyName: row.holyName || '',
          firstName: row.firstName || '',
          lastName: row.lastName || '',
          birthDate: row.birthDate || '',
          address: row.address || '',
          contact: row.contact || '',
          dad: row.dad || '',
          mom: row.mom || '',
          note: row.note || '',
          classId: this.classId,
          sacramentBaptism: row.sacramentBaptism || '',
          sacramentFirstConfession: row.sacramentFirstConfession || '',
          sacramentConfirmation: row.sacramentConfirmation || ''
        };
      });
      this.fileLoaded = true;
    };
  
    reader.readAsBinaryString(target.files[0]);
  }

  validateStudent(row: any, index: number): boolean {
    let isValid = true;
  
    if (!row.holyName || !row.firstName || !row.lastName || !row.birthDate) {
      isValid = false;
    }
  

    isValid = row.birthDate ? this.isValidDate(row.birthDate) : false;
    

    if (row.classId && (!Number.isInteger(row.classId) || row.classId <= 0)) {
      isValid = false;
    }
  
    return isValid;
  }
  
  isValidDate(date: Date) {
    return date instanceof Date &&
           !isNaN(date.getTime()) &&
           date.getFullYear() > 1900;
  }

  import() {
    // this.dialogRef.close(this.students);
    if(this.errorRecords.length > 0) return;
    this.studentService.importRange(this.students).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error importing student:', error);
      }
    );
  }
}
