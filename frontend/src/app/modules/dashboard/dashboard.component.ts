import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from './services/user.service';
import { RecordService } from './services/record.service';
import { ActivityService } from './services/activity.service';
import { User } from '../../shared/models/user.model';
import { Announcement } from '../../shared/models/announcement.model';
import { Activity } from '../../shared/models/activity.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDividerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  announcements: Announcement[] = [];
  activities: Activity[] = [];
  loading = true;
  isAdmin = false;

  announcementColumns = ['title', 'description', 'createdBy', 'date'];
  activityColumns = ['userName', 'action', 'date', 'status'];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private recordService: RecordService,
    private activityService: ActivityService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    forkJoin({
      user: this.userService.getMe(),
      records: this.recordService.getRecords(2000),
      activity: this.activityService.getActivity()
    }).subscribe({
      next: (data) => {
        this.user = data.user;
        this.announcements = data.records;
        this.activities = data.activity;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.authService.logout();
  }
}