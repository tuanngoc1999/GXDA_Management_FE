import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Class, ClassService, Catechist, Core } from '../../services/student.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SelectDialogComponent } from '../common/select-dialog/select-dialog.component';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {
  // @Input() classData: class | null = null;
  @Input() isNewClass: boolean;
  selectedBlockId?: number;
  classForm!: FormGroup;

  cls: Class = {
    id: 0,
    name: '',
    block: {
      id: 0,
      name: ''
    },
    catechists: [{
      id: 0,
      name: ''}]
    ,
    totalStudents: 0
  };

  catechists: Core[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private classService: ClassService,
    public dialogRef: MatDialogRef<ClassDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cls: Class | null }) {
      this.isNewClass = data.cls === null;
      if (!this.isNewClass) {
        this.selectedBlockId = data.cls?.block?.id;
        // this.classForm.v
      }
    }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.classForm = this.fb.group({
      id: [this.data.cls?.id || 0],
      name: [this.data.cls?.name || '', Validators.required],
      blockId: [{ value: this.data.cls?.block?.id || null, disabled: !this.isNewClass}, Validators.required],
      catechistName: [this.data.cls?.catechists?.[0]?.name || ''],
      totalStudents: [this.data.cls?.totalStudents || 0],
    });
  }

  onSelectCatechist() {
    const dialogRef = this.dialog.open(SelectDialogComponent, {
      data: {
        type: 'CATECHIST',
        selectedIds: this.catechists.map(item => item.id)
      },
    });
  
    dialogRef.afterClosed().subscribe((result: Core[] | null) => {
      // Kiểm tra nếu result không phải null hoặc undefined
      if (result && result.length > 0) {
        this.catechists = result;
        const catechistsString = result.map(item => item.name);
  
        // Kiểm tra xem form control 'catechistName' có tồn tại trước khi setValue
        if (this.classForm.get('catechistName')) {
          this.classForm.get('catechistName')?.setValue(catechistsString.join(', ')); // Nối các tên thành chuỗi
        }
      } else {
        // Nếu không có dữ liệu, có thể reset giá trị hoặc xử lý khác tùy theo logic
        this.classForm.get('catechistName')?.setValue('');
      }
    });
  }
  

  save(classForm: any): void {
    if (classForm.valid) {
      var formValue = classForm.value;
      var cls = {
        id: formValue.id,
        name: formValue.name,
        blockId: formValue.blockId ? formValue.blockId : this.selectedBlockId,
        catechists: this.catechists.map(item => item.id)
      }

      if (this.isNewClass) {
          this.classService.addClass(cls).subscribe(
            () => {
              this.dialogRef.close(true);
            },
            (error) => {
              if (error?.status == 409) {
                this.classForm.get('userName')?.setErrors({ alreadyExists: true });
              }
            }
          );
      } else {
        this.classService.updateClass(cls).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating class:', error);
          }
        );
      }
    }
  }

  onBlockChange(blockId: number): void {
    this.selectedBlockId = blockId;
  }

  deleteClass(id: number): void {
    this.classService.deleteClass(id).subscribe(
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
