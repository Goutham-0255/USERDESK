import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../../../shared/models/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private apiUrl = 'https://userdesk-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  getRecords(delay: number = 2000): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/records?delay=${delay}`);
  }
}