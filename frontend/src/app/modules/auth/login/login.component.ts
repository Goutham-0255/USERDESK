import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  fillAdminCredentials(): void {
    this.loginForm.patchValue({
      userId: 'user005',
      password: 'admin123',
      role: 'Admin'
    });
  }

  fillUserCredentials(): void {
    this.loginForm.patchValue({
      userId: 'user006',
      password: 'user123',
      role: 'General User'
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    const { userId, password, role } = this.loginForm.value;

    this.authService.login(userId, password, role).subscribe({
      next: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        if (err.name === 'TimeoutError') {
          this.errorMessage = isLocal
            ? 'Connection timed out. Please check if local backend is running on port 3000.'
            : 'Backend server is taking long to respond (Render free instances may take 30-50s to wake up). Please try again.';
        } else if (err.status === 0) {
          this.errorMessage = isLocal
            ? 'Backend server offline. Please start local backend on port 3000.'
            : 'Unable to connect to live backend on Render (https://userdesk-backend.onrender.com). Server may be waking up.';
        } else if (err.status === 503) {
          this.errorMessage = err.error?.message || 'Database connection offline. Please check MongoDB connection.';
        } else {
          this.errorMessage = err.error?.message || 'Invalid credentials. Please try again.';
        }
        this.cdr.detectChanges();
      }
    });
  }
}