import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StudentService, Student, ClassService, Class, Block, BlockService, CatechistService } from '../../services/student.service';
import { StudentDetailDialogComponent } from '../student-detail-dialog/student-detail-dialog.component';
import { StudentImportDialogComponent } from '../student-import-dialog/student-import-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'birthDate', 'dad', 'mom'];
  dataSource = new MatTableDataSource<Student>();
  classes: Class[] = [];
  blocks: Block[] = [];
  selectedBlockId: number | null = null;
  selectedClassId: number | null = null;

  constructor(
    private studentService: StudentService,
    private classService: ClassService,
    private blockervice: BlockService,
    private catechistService: CatechistService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBlocks();
    // this.userName = localStorage.getItem('userName');

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  navigateToRegistration() {
    this.router.navigate(['/registration-processing']);
  }

  loadClasses(): void {
    this.catechistService.GetCatechistsIncludeClassByCatechistId(1).subscribe(
      (data) => {
        this.classes = data.classes!;
        if (this.classes.length > 0) {
          this.selectedClassId = this.classes[0].id;
          this.loadStudents(this.selectedClassId);
        }
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  loadBlocks(): void {
    this.blockervice.getBlocksDetail().subscribe(
      (data) => {
        this.blocks = data;
        if (this.blocks.length > 0) {
          this.selectedBlockId = this.blocks[0].id;
          if (this.blocks[0].classes!.length > 0) {
            this.classes = this.blocks[0].classes!;
            this.selectedClassId = this.classes[0].id;
            this.loadStudents(this.selectedClassId);
          }
        }
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  loadStudents(classId: number): void {
    this.studentService.getStudentsByClassId(classId).subscribe(
      (data) => {
        this.dataSource.data = data;
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  onClassChange(classId: number): void {
    this.selectedClassId = classId;
    this.loadStudents(classId);
  }

  onBlockChange(blockId: number): void {
    this.selectedBlockId = blockId;
    var selectedBlock = this.blocks.find(x => x.id == blockId);
    if (selectedBlock && selectedBlock.classes!.length > 0) {
      this.selectedClassId = selectedBlock.classes![0].id;
      this.loadStudents(this.selectedClassId);
    }
  }

  openStudentDetail(student: Student): void {
    const dialogRef = this.dialog.open(StudentDetailDialogComponent, {
      width: '600px',
      data: { student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents(this.selectedClassId!);
      }
    });
  }

  addStudent(): void {
    const dialogRef = this.dialog.open(StudentDetailDialogComponent, {
      width: '600px',
      data: { student: null }  // Truyền null để tạo một học sinh mới
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents(this.selectedClassId!);
      }
    });
  }

  import(): void {
    if(!this.selectedClassId || this.selectedClassId < 0) return;
    const dialogRef = this.dialog.open(StudentImportDialogComponent, {
      width: '400px',
      data: {classId: this.selectedClassId}
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadStudents(this.selectedClassId!);
    });
  }

  export(): void {
    const dialogRef = this.dialog.open(StudentDetailDialogComponent, {
      width: '600px',
      data: { student: null }  // Truyền null để tạo một học sinh mới
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents(this.selectedClassId!);
      }
    });
  }
}
