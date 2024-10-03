
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService, Student } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Block, Class, BlockService, RegistrationSection, RegistrationSectionService } from '../../services/student.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-registration-processing',
  templateUrl: './registration-processing.component.html',
  styleUrls: ['./registration-processing.component.css']
})
export class RegistrationProcessingComponent implements OnInit {
  guid: string | null = null;

  // studentForm!: FormGroup;
  isNewStudent: boolean = true;
  isReady: boolean = false;
  blocks: Block[] = [];
  classes: Class[] = [];
  selectedBlockId: number | null = null;
  selectedClassId: number | null = null;

  // registrationProcessing: RegistrationProcessing = {
  //   id: 0,
  //   studentId: 0,
  //   status: 0,
  //   lastProcessingDate: '',
  //   registeredDate: '',
  //   processingGUID: '',
  //   updatedBy: 0
  // };
  
  student: Student = {
    id: 0,
    holyName: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    contact: '',
    dad: '',
    mom: '',
    note: '',
    createdBy: 0,
    updatedBy: 0,
    classId: 0,
    sacramentBaptism: '',
    sacramentFirstConfession: '',
    sacramentConfirmation: '',
    addedDate: ''
  };

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private registrationSectionService: RegistrationSectionService,
    // private registrationProcessingService: RegistrationProcessingService,
    private blockService: BlockService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.next();
    this.loadBlocks();
  }

  private loadBlocks(): void {
    this.blockService.getBlocksDetail().subscribe(
      (data) => {
        this.blocks = data;
        if (this.blocks.length > 0) {
          this.selectedBlockId = this.blocks[0].id;
          this.classes = this.blocks[0].classes!;
        }
      },
      (error) => {
        console.error('Error fetching blocks:', error);
      }
    );
  }


  onBlockChange(blockId: number): void {
    this.selectedBlockId = blockId;
    var block = this.blocks.find(x => x.id == blockId);
    if (block && block.classes) this.classes = block.classes;
  }

  onClassChange(classId: number): void {
    this.selectedClassId = classId;
  }

  cancel(studentForm: any): void {
    // this.selectedClassId = classId;
  }

  save(studentForm: any): void {
    if (studentForm.valid) {
      var formValue = studentForm.value;
      Object.assign(this.student, formValue);
      this.studentService.regist(this.student).subscribe(
        () => {

        },
        (error) => {
          console.error('Error adding student:', error);
        }
      );

    }
  }

  next(): void {
    this.isReady = false;
    this.studentService.getNextForApprove().subscribe(
      (data) => {
        this.student = data;
        this.isReady = true;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }
}

