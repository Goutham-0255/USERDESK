import { Component, OnInit, ChangeDetectorRef } from '@angular/core';import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminService } from './services/admin.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTabsModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  loading = true;
  showUserForm = false;
  showAnnouncementForm = false;
  editingUser: User | null = null;

  userColumns = ['name', 'email', 'userId', 'role', 'actions'];
  announcementColumns = ['title', 'description', 'actions'];

  userForm: FormGroup;
  announcementForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef

  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userId: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
  this.loading = true;
  this.adminService.getAllUsers().subscribe({
    next: (users) => {
      this.users = users;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}
  openAddUser(): void {
  this.editingUser = null;
  this.userForm.reset();
  // Add password requirement when adding
  this.userForm.get('password')?.setValidators(Validators.required);
  this.userForm.get('password')?.updateValueAndValidity();
  this.showUserForm = true;
}

  openEditUser(user: User): void {
  this.editingUser = user;
  this.userForm.patchValue({
    name: user.name,
    email: user.email,
    userId: user.userId,
    role: user.role
  });
  // Remove password requirement when editing
  this.userForm.get('password')?.clearValidators();
  this.userForm.get('password')?.updateValueAndValidity();
  this.showUserForm = true;
}

  saveUser(): void {
    if (this.userForm.invalid) return;

    const currentUser = this.authService.getCurrentUser();

    if (this.editingUser) {
      this.adminService.updateUser(this.editingUser._id, this.userForm.value).subscribe({
        next: () => {
          this.snackBar.open('User updated!', 'Close', { duration: 3000 });
          this.showUserForm = false;
          this.loadUsers();
        }
      });
    } else {
      this.adminService.addUser(this.userForm.value).subscribe({
        next: () => {
          this.snackBar.open('User added!', 'Close', { duration: 3000 });
          this.showUserForm = false;
          this.loadUsers();
        }
      });
    }
  }

  deleteUser(id: string): void {
    this.adminService.deleteUser(id).subscribe({
      next: () => {
        this.snackBar.open('User deleted!', 'Close', { duration: 3000 });
        this.loadUsers();
      }
    });
  }

  saveAnnouncement(): void {
    if (this.announcementForm.invalid) return;
    const currentUser = this.authService.getCurrentUser();
    this.adminService.addAnnouncement({
      ...this.announcementForm.value,
      createdBy: currentUser?.name || 'Admin'
    }).subscribe({
      next: () => {
        this.snackBar.open('Announcement created!', 'Close', { duration: 3000 });
        this.showAnnouncementForm = false;
        this.announcementForm.reset();
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.logout();
  }
}