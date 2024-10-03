import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService, ClassService, StudentAttendance,
          Class, CreateAttendanceDto, Attendance,
          AttendanceService, StudentScore, Score} from '../../services/student.service';
import {AddScoresComponent} from './add-scores/add-scores.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'term-1', 'term-2', 'term-3'];
  dataSource = new MatTableDataSource<StudentScore>();
  classes: Class[] = [];
  selectedClassId: number | null = null;
  isUpdateAttendances: boolean = false;

  startMonth: number = 5;
  months: any[] = [];
  sundayColumns: string[] = [];
  selectedMonth: number = 0;

  updateList: CreateAttendanceDto[] = [];
  addList: CreateAttendanceDto[] = [];

  constructor(
    private studentService: StudentService,
    private classService: ClassService,
    private attendanceService: AttendanceService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadClasses();
    // this.generateMonths();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  generateMonths(): void {
    const monthNames = [
      {index: 0, name: 'Tháng 1',},
      {index: 1, name: 'Tháng 2',},
      {index: 2, name: 'Tháng 3',},
      {index: 3, name: 'Tháng 4',},
      {index: 4, name: 'Tháng 5',},
      {index: 5, name: 'Tháng 6',},
      {index: 6, name: 'Tháng 7',},
      {index: 7, name: 'Tháng 8',},
      {index: 8, name: 'Tháng 9',},
      {index: 9, name: 'Tháng 10',},
      {index: 10, name: 'Tháng 11',},
      {index: 11, name: 'Tháng 12',},
    ];

    let num = 9;
    while (num > 0) {
      if (this.startMonth > 11) this.startMonth = 1;
      var month = monthNames.find(x => x.index == this.startMonth);
      this.months.push(month);
      num --;
      this.startMonth ++;
    }

    this.selectedMonth = new Date().getMonth();
    this.onMonthChange(this.selectedMonth);
  }

  onMonthChange(month: number): void {
    this.selectedMonth = month;
    const monthIndex = this.months.find(x =>x.index == month);
    if (monthIndex.index !== -1) {
      this.updateTable(monthIndex.index);
    }
  }

  updateTable(monthIndex: number): void {
    // Clear previous Sunday columns
    this.sundayColumns = [];
    
    const year = new Date().getFullYear();
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);
    let sunday = new Date(startDate);

    while (sunday.getDay() !== 0) {
      sunday.setDate(sunday.getDate() + 1);
    }

    while (sunday <= endDate) {
      this.sundayColumns.push(`${sunday.getDate()}/${sunday.getMonth() + 1}`);
      sunday.setDate(sunday.getDate() + 7);
    }

    this.displayedColumns = ['id', 'name', ...this.sundayColumns];
  
  }

  updateAttendance(id: number, date: string, status: number): void {
    const studentAttendance = this.dataSource.data.find(s => s.student.id === id);
    
    // if (studentAttendance) {
    //   const attendanceEntry = studentAttendance.attendances.find(a => a.date === date);
    //   var item: CreateAttendanceDto = {
    //     studentId: studentAttendance.student.id,
    //     date: date,
    //     status: status
    //   }
    //   if (attendanceEntry) {
    //     var existedItem = this.updateList.find(a => a.studentId == id && a.date === item.date);
    //     if (existedItem != null) {
    //       existedItem.status = status;
    //     } else {
    //       this.updateList.push(item);
    //     }
    //   } else {
    //     var existedItem = this.addList.find(a => a.studentId == id && a.date === item.date);
    //     if (existedItem != null) {
    //       existedItem.status = status;
    //     } else {
    //     this.addList.push(item);
    //     }
    //   }
  
    //   this.dataSource.data = [...this.dataSource.data];
    // }
  }
  getScore(scores: Score[], term: string): string {
    var score = scores.find(x => x.term === term);
    return score ? 'GL: ' + score.catechismMark + ' - Kinh: ' + score.prayerMark : '';
  }

  loadClasses(): void {
    this.classService.getAsignedClasses().subscribe(
      (data) => {
        this.classes = data;
        if (this.classes.length > 0) {
            this.selectedClassId = this.classes[0].id;
            this.loadScore(this.selectedClassId);
        }
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  loadScore(classId: number): void {
    this.studentService.getScoreByClassId(classId, "all").subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  addScores(): void {
    var scoreData: StudentScore[] = [];
    this.dataSource.data.forEach(s => {
      var sScore: StudentScore = {
        student: s.student,
        scores: [{
          id: 0,
          catechismMark: '',
          prayerMark: '',
          term: '',
          note: ''
        }]
      }
      scoreData.push(sScore);
    });
    const dialogRef = this.dialog.open(AddScoresComponent, {
      width: '600px',
      data: { 
        classId: this.selectedClassId,
        scores: scoreData
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.loadScore(this.selectedClassId!);
    });
  }

  onCancel(): void {
    this.updateList = [];
    this.addList = [];
  }

  onClassChange(classId: number): void {
    this.selectedClassId = classId;
    this.onCancel();
    this.loadScore(classId);
  }
}
