import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  type: string = '';
  title: string = 'Xác nhận';
  selectedState: string = '';

  ngOnInit(): void {
    
  }

  closeDialog(): void {
    this.dialogRef.close(this.selectedState);
  }
}

