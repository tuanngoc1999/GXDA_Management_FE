import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StudentService, Student, ClassService, Class, Block, BlockService, Catechist, CatechistService } from '../../services/student.service';
import { CatechistDetailComponent } from '../catechist-detail/catechist-detail.component';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-catechist-list',
  templateUrl: './catechist-list.component.html',
  styleUrls: ['./catechist-list.component.css']
})
export class CatechistListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'birthDate', 'class'];
  dataSource = new MatTableDataSource<Catechist>();
  profile = {
    addCatechist: false
  };
  constructor(
    private catechistService: CatechistService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.loadCatechists();


  }

  loadCatechists(): void {
    this.catechistService.getCatechists().subscribe(
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

  getClassesForCatechist(catechist: Catechist): string {
    return catechist?.classes?.map(c => `${c.name}`).join(', ') || '';
  }
  

  openCatechistDetail(catechist: Catechist): void {
    const dialogRef = this.dialog.open(CatechistDetailComponent, {
      width: '600px',
      data: { catechist }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCatechists();
      }
    });
  }

  addCatechist(): void {
    if(!this.profile.addCatechist) return;
    const dialogRef = this.dialog.open(CatechistDetailComponent, {
      width: '600px',
      data: { catechist: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCatechists();
      }
    });
  }

  getProfile(): void {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const jsonObject = JSON.parse(storedProfile);
      this.profile.addCatechist = jsonObject?.p10;
    }
  }
}

