import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


const AUTH_API = 'http://localhost:3000/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    return this.http.post(`${AUTH_API}/login`, {
      username: credentials.username,
      password: credentials.password,
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(`${AUTH_API}/register`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      username: user.username,
      password: user.password,
    }, httpOptions);
  }
}
