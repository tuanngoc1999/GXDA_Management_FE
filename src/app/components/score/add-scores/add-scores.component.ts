import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { StudentService, StudentScore, CreateScoreDto, ScoreService } from '../../../services/student.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-scores',
  templateUrl: './add-scores.component.html',
  styleUrls: ['./add-scores.component.css']
})
export class AddScoresComponent implements OnInit {
  isNewScore: boolean = true;
  selectedTerm: number = 0;
  displayedColumns: string[] = ['id', 'name', 'catechismMark', 'prayerMark', 'note'];
  dataSource = new MatTableDataSource<StudentScore>();
  selectedClassId: number;
  addList: CreateScoreDto[] = [];
  updateList: CreateScoreDto[] = [];


  constructor(
    private studentService: StudentService,
    private scoreService: ScoreService,
    public dialogRef: MatDialogRef<AddScoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { classId: number, scores: StudentScore[] }
  ) {
    this.dataSource.data = data.scores;
    this.selectedClassId = data.classId
  }


  ngOnInit(): void {

  }

  onTermChange(termId: number): void {
    this.selectedTerm = termId;
    this.loadScore(this.selectedClassId, termId);
  }

  loadScore(classId: number, term: number): void {
    var termString = "term-" + term;
    this.studentService.getScoreByClassId(classId, termString).subscribe(
      (data) => {
        // this.dataSource.data = data;
        var scoreData: StudentScore[] = [];
        data.forEach((s) => {
          if (s.scores?.length > 0) this.isNewScore = false;
          var sScore: StudentScore = {
            student: s.student,
            scores: [{
              id: s.scores[0] ? s.scores[0].id : 0,
              catechismMark: s.scores[0] ? s.scores[0].catechismMark : '',
              prayerMark: s.scores[0] ? s.scores[0].prayerMark : '',
              term: s.scores[0] ? s.scores[0].term : '',
              note: s.scores[0] ? s.scores[0].note : ''
            }]
          }
          scoreData.push(sScore);
        });
        this.dataSource.data = scoreData;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  isFloat(value: string): boolean {
    const floatVal = parseFloat(value);
    return !isNaN(floatVal) && isFinite(floatVal);
  }

  prepareDataToSave(): void {
    if (this.selectedTerm < 1) return;
    this.addList = [];
    this.updateList = [];
    for (const element of this.dataSource.data) {
      if (!this.isFloat(element.scores[0].catechismMark.toString()) ||
        !this.isFloat(element.scores[0].prayerMark.toString())) {
        continue;
      }

      var sScore: CreateScoreDto = {
        studentId: element.student.id,
        catechismMark: element.scores[0].catechismMark,
        prayerMark: element.scores[0].prayerMark,
        note: element.scores[0].note,
      };
      if (element.scores[0].id == 0){
        this.addList.push(sScore);
      } else {
        this.updateList.push(sScore);
      }
      // scoreData.push(sScore);
    }
  }


  save(): void {
    this.prepareDataToSave();

    let addScorePromise: Promise<any> = Promise.resolve();
  
    if (this.addList.length > 0) {
      addScorePromise = this.scoreService.addScores(this.selectedClassId!, this.addList, "term-" + this.selectedTerm).toPromise();
      addScorePromise
        .then((response) => {
          this.addList = [];
        })
        .catch((error) => {
          console.error('Error adding scores:', error);
        });
    }
  
    addScorePromise
      .then(() => {
        if (this.updateList.length > 0) {
          return this.scoreService.updateScores(this.selectedClassId!, this.updateList, "term-" + this.selectedTerm).toPromise();
        } else {
          return Promise.resolve();
        }
      })
      .then(() => {
        this.updateList = [];
        this.close();
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
