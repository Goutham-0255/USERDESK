import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { API_URL } from '../../../core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }
}