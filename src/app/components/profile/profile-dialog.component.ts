import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PROFILE_TITLES } from '../../resources/profile-title';
import {Profile, CreateProfileDto, ProfileService} from '../../services/student.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {
  profile: Profile = {
    id: 0,
    name: '',
    p1: false,
    p2: false,
    p3: false,
    p4: false,
    p5: false,
    p6: false,
    p7: false,
    p8: false,
    p9: false,
    p10: false,
    p11: false,
    p12: false,
    p13: false,
    p14: false,
    p15: false,
    p16: false,
    p17: false,
    p18: false,
    p19: false,
    p20: false,
    p21: false,
    p22: false,
    p23: false,
    p24: false,
    quantityUsed: 0,
    createdByCatechist: { id: 0, name: '' },
    updatedByCatechist: { id: 0, name: '' }
  };

  isNewProfile: boolean = false;
  constructor(public dialogRef: MatDialogRef<ProfileDialogComponent>,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: { profile: Profile | null }) {
      this.isNewProfile = data.profile === null;
  }

  ngOnInit(): void {
    if(this.data.profile != null) {
      this.profile = this.data.profile;
    }
    // this.populateBooleanFields();
    // this.categoryKeys = Object.keys(CATEGORIES);
    // this.groupFieldsByCategory();
  }
  
  save(): void {
    if(this.profile.name.trim() == '') return;
    var profile: CreateProfileDto = {
      name: this.profile.name,
      p1: this.profile.p1,
      p2: this.profile.p2,
      p3: this.profile.p3,
      p4: this.profile.p4,
      p5: this.profile.p5,
      p6: this.profile.p6,
      p7: this.profile.p7,
      p8: this.profile.p8,
      p9: this.profile.p9,
      p10: this.profile.p10,
      p11: this.profile.p11,
      p12: this.profile.p12,
      p13: this.profile.p13,
      p14: this.profile.p14,
      p15: this.profile.p15,
      p16: this.profile.p16,
      p17: this.profile.p17,
      p18: this.profile.p18,
      p19: this.profile.p19,
      p20: this.profile.p20,
      p21: this.profile.p21,
      p22: this.profile.p22,
      p23: this.profile.p23,
      p24: this.profile.p24
    }
    if (this.isNewProfile) {
      this.profileService.addProfile(profile).subscribe({
        next: (response) => {
          this.dialogRef.close('ok');
        },
        error: (err) => {
          console.error('Failed to create profile:', err);
        }
      });
    } else {
      this.profileService.updateProfile(this.profile.id, profile).subscribe({
        next: (response) => {
          this.dialogRef.close('ok');
        },
        error: (err) => {
          console.error('Failed to update profile:', err);
        }
      });
    }
  }

  delete(): void {
    if (!this.isNewProfile && this.profile.id) {
      this.profileService.deleteProfile(this.profile.id).subscribe({
        next: () => {
          this.dialogRef.close('ok');
        },
        error: (err) => {
          console.error('Failed to delete profile:', err);
        }
      });
    }
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
}
