import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catechist, CatechistService, CatechistRegistrationDto, Core } from '../../services/student.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SelectDialogComponent } from '../common/select-dialog/select-dialog.component';

@Component({
  selector: 'app-catechist-detail',
  templateUrl: './catechist-detail.component.html',
  styleUrls: ['./catechist-detail.component.css']
})
export class CatechistDetailComponent implements OnInit {
  // @Input() catechistData: Catechist | null = null;
  @Input() isNewCatechist: boolean = false;
  catechistForm!: FormGroup;
  catechist: Catechist = {
    id: 0,
    holyName: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    contact: '',
    joinedDate: '',
    level: '',
    classes: [],
    catechistProfiles: []
  };
  profiles: Core[] = [];
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private catechistService: CatechistService,
    public dialogRef: MatDialogRef<CatechistDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { catechist: Catechist | null }) {
      this.isNewCatechist = data.catechist === null;
      if (this.isNewCatechist) {
        // this.catechistForm.v
      }
    }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    var profileString = '';
    if (this.data.catechist && this.data.catechist.catechistProfiles && this.data.catechist.catechistProfiles.length > 0)
    {
      this.profiles = this.data.catechist.catechistProfiles;
      profileString = this.data.catechist.catechistProfiles.map(c => `${c.name}`).join(', ');
    }
    this.catechistForm = this.fb.group({
      id: [this.data.catechist?.id || 0],
      holyName: [this.data.catechist?.holyName || '', Validators.required],
      firstName: [this.data.catechist?.firstName || '', Validators.required],
      lastName: [this.data.catechist?.lastName || '', Validators.required],
      birthDate: [this.data.catechist?.birthDate ? new Date(this.data.catechist.birthDate) : null, Validators.required],
      address: [this.data.catechist?.address || ''],
      contact: [this.data.catechist?.contact || ''],
      level: [this.data.catechist?.contact || ''],
      userName: [this.data.catechist?.user?.name || '', Validators.required],
      password: ['', this.isNewCatechist ? Validators.required : null],
      profiles: [profileString]
    });
  }

  save(catechistForm: any): void {
    if (catechistForm.valid) {
      var formValue = catechistForm.value;
      let newCatechist: CatechistRegistrationDto = {
        holyName: formValue.holyName,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        birthDate: formValue.birthDate,
        address: formValue.address,
        contact: formValue.contact,
        level: formValue.level,
        userName: formValue.userName,
        password: formValue.password,
        profileIds: this.profiles.map(item => item.id)
      };

      if (this.isNewCatechist) {
        this.catechistService.addCatechist(newCatechist).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error) => {
            if (error?.status == 409) {
              this.catechistForm.get('userName')?.setErrors({ alreadyExists: true });
            }
          }
        );
      } else {
        this.catechistService.updateCatechist(this.data.catechist!.id, newCatechist).subscribe(
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

  onSelectProfile() {
    var profileIds;
    if (this.profiles.length > 0)
    {
      profileIds = this.profiles.map(item => item.id);
    }
    const dialogRef = this.dialog.open(SelectDialogComponent, {
      data: {
        type: 'PROFILE',
        selectedIds: profileIds
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && Array.isArray(result)) {
        const names = result.map(item => item.name).filter(name => name);
        this.profiles = result;
        this.catechistForm.get('profiles')?.setValue(names.join(', '));
      }
    });
  }

  deleteCatechist(id: number): void {
    this.catechistService.deleteCatechist(id).subscribe(
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
