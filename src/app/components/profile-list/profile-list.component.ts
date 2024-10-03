import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Profile, ProfileService } from '../../services/student.service';
import { ProfileDialogComponent } from '../profile/profile-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'createdBy', 'quantityUsed'];
  dataSource = new MatTableDataSource<Profile>();

  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfiles();


  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe(
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

  openProfileDetail(profile: Profile): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '600px',
      data: { profile }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProfiles();
      }
    });
  }

  addProfile(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '600px',
      data: { profile: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProfiles();
      }
    });
  }
}


