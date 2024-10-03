import { Component, OnInit } from '@angular/core';
import { RegistrationSection, RegistrationSectionService} from '../../services/student.service';

@Component({
  selector: 'app-registration-section',
  templateUrl: './registration-section.component.html',
  styleUrls: ['./registration-section.component.css']
})
export class RegistrationSectionComponent implements OnInit {
  urlToGenerateQRCode = 'http://localhost:4200/student-detail/';
  section: RegistrationSection = {
    guid: '',
    initDate: '',
    status: false
  };

  constructor(
    private registrationSectionService: RegistrationSectionService
  ) {}

  ngOnInit(): void {
    this.loadValidSection();

  }

  loadValidSection(): void {
    this.registrationSectionService.getValid().subscribe(
      (data) => {
        this.section = data
        this.urlToGenerateQRCode += data.guid;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  createNewSection(): void {
    this.registrationSectionService.createSection().subscribe(
      (data) => {
        this.section = data;
        this.urlToGenerateQRCode += data.guid;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }
}
