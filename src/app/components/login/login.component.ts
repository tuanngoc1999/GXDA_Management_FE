import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CatechistService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private catechistService: CatechistService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (response) => {
          this.getLoginProfile();
        },
        (error) => {
          // Handle login failure
          console.error('Login failed:', error);
        }
      );
    }
  }

  getLoginProfile(): void {
    this.catechistService.getLoginUserProfile().subscribe(
      (response) => {
        localStorage.setItem('profile', JSON.stringify(response));
        this.router.navigate(['/student-list']);
      },
      (error) => {
        
      }
    );
  }
}
