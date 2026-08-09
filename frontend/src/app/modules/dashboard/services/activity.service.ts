import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../../../shared/models/activity.model';
import { API_URL } from '../../../core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  getActivity(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/activity`);
  }
}