import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { API_URL } from '../../../core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/users`);
  }

  addUser(user: Partial<User> & { password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/users`, user);
  }

  updateUser(id: string, user: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/users/${id}`);
  }

  addAnnouncement(data: { title: string; description: string; createdBy: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/announcements`, data);
  }

  deleteAnnouncement(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/announcements/${id}`);
  }
}