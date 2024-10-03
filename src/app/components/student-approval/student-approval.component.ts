import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService, Student, ClassService, Class, Block, BlockService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-approval',
  templateUrl: './student-approval.component.html',
  styleUrls: ['./student-approval.component.css']
})
export class StudentApprovalComponent implements OnInit {
  studentForm!: FormGroup;
  isNewStudent: boolean = true;
  blocks: Block[] = [];
  classes: Class[] = [];
  selectedBlockId: number | null = null;
  selectedClassId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private classService: ClassService,
    private blockService: BlockService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadBlocks();

    this.route.params.subscribe(params => {
      const studentId = +params['id'];
      if (studentId) {
        this.isNewStudent = false;
        this.studentService.getStudentById(studentId).subscribe(student => {
          this.studentForm.patchValue(student);
        });
      }
    });
  }

  private initializeForm(): void {
    this.studentForm = this.fb.group({
      id: [null],
      holyName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [null, Validators.required],
      address: [''],
      contact: [''],
      dad: [''],
      mom: [''],
      note: [''],
      sacramentBaptism: [''],
      sacramentFirstConfession: [''],
      sacramentConfirmation: [''],
      addedDate: [null]
    });
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

  save(): void {
    // if (this.studentForm.valid) {
    //   if (this.isNewStudent) {
    //     this.studentService.addStudent(this.studentForm.value).subscribe(
    //       () => {
    //         this.router.navigate(['/students']);
    //       },
    //       (error) => {
    //         console.error('Error adding student:', error);
    //       }
    //     );
    //   } else {
    //     this.studentService.updateStudent(this.studentForm.value).subscribe(
    //       () => {
    //         this.router.navigate(['/students']);
    //       },
    //       (error) => {
    //         console.error('Error updating student:', error);
    //       }
    //     );
    //   }
    // }
  }
}
