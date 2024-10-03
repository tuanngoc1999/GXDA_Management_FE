
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StudentService, Student, ClassService, Class, Block, BlockService, Catechist, CatechistService } from '../../services/student.service';
import { ClassDetailComponent } from '../class-detail/class-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'catechist', 'total'];
  dataSource = new MatTableDataSource<Class>();

  constructor(
    private catechistService: CatechistService,
    private classService: ClassService,
    private blockervice: BlockService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClasses();


  }

  loadClasses(): void {
    this.classService.getClasses().subscribe(
      (data) => {
        data.forEach(function (c) {

      });
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  openClassDetail(cls: Class): void {
    const dialogRef = this.dialog.open(ClassDetailComponent, {
      width: '600px',
      data: { cls }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClasses();
      }
    });
  }

  addClass(): void {
    const dialogRef = this.dialog.open(ClassDetailComponent, {
      width: '600px',
      data: { cls: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClasses();
      }
    });
  }
}

