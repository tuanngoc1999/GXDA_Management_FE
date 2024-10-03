import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Core {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  holyName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address?: string;
  contact?: string;
  dad?: string;
  mom?: string;
  note?: string;
  createdBy?: number;
  updatedBy?: number;
  classId?: number;
  sacramentBaptism?: string;
  sacramentFirstConfession?: string;
  sacramentConfirmation?: string;
  addedDate: string;
}

export interface CreateStudentDto {
  holyName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address?: string;
  contact?: string;
  dad?: string;
  mom?: string;
  note?: string;
  classId?: number;
  sacramentBaptism?: string;
  sacramentFirstConfession?: string;
  sacramentConfirmation?: string;
}

export interface Catechist {
  id: number;
  holyName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address?: string;
  contact?: string;
  joinedDate?: string;
  level?: string;
  classes?: Class[];
  user?: Core;
  catechistProfiles?: Core[];
}

export interface CatechistRegistrationDto {
  holyName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address?: string;
  contact?: string;
  level?: string;
  userName: string;
  password: string;
  profileIds?: number[];
}

// Define the Class interface based on your .NET Core Class model
export interface Class {
  id: number;
  name: string;
  block?: Core;
  catechists: Core[];
  totalStudents?: number;
}

export interface Block {
  id: number;
  name: string;
  classes?: Class[];
  // Add other properties based on the Class model
}

export interface Attendance {
  id: number;
  date: string;
  status: number;
  CreatedByCatechist?: Core;
  UpdatedByCatechist?: Core;
}

export interface CreateAttendanceDto {
  studentId: number;
  date: string;
  status: number;
}

export interface StudentAttendance {
  student: Core;
  class: Core;
  attendances: Attendance[];
}

export interface Score {
  id: number;
  catechismMark: string;
  prayerMark: string;
  term: string;
  note?: string;
  createdByCatechist?: Core;
  updatedByCatechist?: Core;
}

export interface CreateScoreDto {
  studentId: number;
  catechismMark: string;
  prayerMark: string;
  note?: string;
}

export interface StudentScore {
  student: Core;
  class?: Core;
  scores: Score[];
}

export interface Profile {
  id: number;
  name: string;
  p1: boolean;
  p2: boolean;
  p3: boolean;
  p4: boolean;
  p5: boolean;
  p6: boolean;
  p7: boolean;
  p8: boolean;
  p9: boolean;
  p10: boolean;
  p11: boolean;
  p12: boolean;
  p13: boolean;
  p14: boolean;
  p15: boolean;
  p16: boolean;
  p17: boolean;
  p18: boolean;
  p19: boolean;
  p20: boolean;
  p21: boolean;
  p22: boolean;
  p23: boolean;
  p24: boolean;
  quantityUsed: number;
  createdByCatechist?: Core;
  updatedByCatechist?: Core;
}

export interface CreateProfileDto {
  name: string;
  p1: boolean;
  p2: boolean;
  p3: boolean;
  p4: boolean;
  p5: boolean;
  p6: boolean;
  p7: boolean;
  p8: boolean;
  p9: boolean;
  p10: boolean;
  p11: boolean;
  p12: boolean;
  p13: boolean;
  p14: boolean;
  p15: boolean;
  p16: boolean;
  p17: boolean;
  p18: boolean;
  p19: boolean;
  p20: boolean;
  p21: boolean;
  p22: boolean;
  p23: boolean;
  p24: boolean;
}

export interface Catechist {
  // Define properties of Catechist based on your C# model
}


export interface CatechistProfile {
  id: number;
}

export interface RegistrationSection {
  guid: string;
  initDate: string;
  status: boolean;
}

export interface RegistrationProcessing {
  id: number;
  studentId: number;
  status: number;
  lastProcessingDate: string;
  processingGUID?: string;
  updatedBy?: number;
  registeredDate: string;
}


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7052/api/student';

  constructor(private http: HttpClient) {}

  getStudentsByClassId(classId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/classes/${classId}`);
  }
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }
  updateStudent(student: CreateStudentDto, id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, student);
  }

  addStudent(student: CreateStudentDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, student);
  }

  importRange(students: CreateStudentDto[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/range`, students);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {});
  }

  getNextForApprove(): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/waitingregistration`);
  }

  regist(student: CreateStudentDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/registration`, student, {});
  }

  getAttendanceByClassId(classId: number, month: number): Observable<StudentAttendance[]> {
    return this.http.get<StudentAttendance[]>(`${this.apiUrl}/attendancesbyclass/${classId}?month=${month}`);
  }

  getScoreByClassId(classId: number, term: string): Observable<StudentScore[]> {
    return this.http.get<StudentScore[]>(`${this.apiUrl}/scoresbyclass/${classId}?term=${term}`);
  }
}

@Injectable({
  providedIn: 'root'
})

export class ClassService {
  private apiUrl = 'https://localhost:7052/api/class';

  constructor(private http: HttpClient) {}

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.apiUrl);
  }
  getClassesDetail(blockId: string): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.apiUrl}/block/${blockId}`);
  }

  getAsignedClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.apiUrl}/asignedclasses`);
  }

  addClass(cls: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, cls, {});
  }

  updateClass(cls: any): Observable<void> {
    return this.http.put<void>(this.apiUrl, cls, {});
  }

  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {});
  }
}

@Injectable({
  providedIn: 'root'
})

export class BlockService {
  private apiUrl = 'https://localhost:7052/api/block';

  constructor(private http: HttpClient) {}

  getBlocksDetail(): Observable<Block[]> {
    return this.http.get<Block[]>(`${this.apiUrl}/blocksdetail`);
  }

}

@Injectable({
  providedIn: 'root'
})

export class RegistrationSectionService {
  private apiUrl = 'https://localhost:7052/api/registrationsection';

  constructor(private http: HttpClient) {}

  getValid(): Observable<RegistrationSection> {
    return this.http.get<RegistrationSection>(`${this.apiUrl}/valid`);
  }

  async getRegistrationSection(guid: string): Promise<RegistrationSection> {
    const params = new HttpParams().set('guid', guid);

    try {
      // Chuyển đổi Observable thành Promise
      const response = await this.http.get<RegistrationSection>(`${this.apiUrl}/validation`, { params }).toPromise();
      return response!;
    } catch (error) {
      console.error('Error fetching registration section', error);
      throw error;
    }
  }

  createSection(): Observable<RegistrationSection> {
    return this.http.post<RegistrationSection>(this.apiUrl, {});
  }
}


@Injectable({
  providedIn: 'root'
})

export class CatechistService {
  private apiUrl = 'https://localhost:7052/api/catechist';

  constructor(private http: HttpClient) {}

  getCatechists(): Observable<Catechist[]> {
    return this.http.get<Catechist[]>(this.apiUrl);
  }

  addCatechist(catechist: CatechistRegistrationDto): Observable<Catechist> {
    return this.http.post<Catechist>(this.apiUrl, catechist, {});
  }

  updateCatechist(catechistId: number, catechist: CatechistRegistrationDto): Observable<Catechist> {
    return this.http.put<Catechist>(`${this.apiUrl}/${catechistId}`, catechist, {});
  }

  deleteCatechist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {});
  }

  GetCatechistsIncludeClassByCatechistId(catechistId: number): Observable<Catechist> {
    return this.http.get<Catechist>(`${this.apiUrl}/${catechistId}/classes`);
  }

  getLoginUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }
}


@Injectable({
  providedIn: 'root'
})

export class AttendanceService {
  private apiUrl = 'https://localhost:7052/api/attendance';

  constructor(private http: HttpClient) {}

  addAttendances(classId: number, attendances: CreateAttendanceDto[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/attendances/${classId}`, attendances, {});
  }

  updateAttendances(classId: number, attendances: CreateAttendanceDto[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/attendances/${classId}`, attendances, {});
  }


}

@Injectable({
  providedIn: 'root'
})

export class ScoreService {
  private apiUrl = 'https://localhost:7052/api/score';

  constructor(private http: HttpClient) {}

  addScores(classId: number, scores: CreateScoreDto[], term: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/scores/${classId}?term=${term}`, scores, {});
  }

  updateScores(classId: number, scores: CreateScoreDto[], term: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/scores/${classId}?term=${term}`, scores, {});
  }
}

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  private apiUrl = 'https://localhost:7052/api/profile';

  constructor(private http: HttpClient) {}

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }

  addProfile(profile: CreateProfileDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, profile, {});
  }

  updateProfile(id: number, profile: CreateProfileDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, profile, {});
  }

  deleteProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {});
  }
}