import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../../../shared/models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getActivity(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/activity`);
  }
}