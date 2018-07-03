import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  get<T>(url: string): Observable<any> {
    const httpOptions = {
      withCredentials: true
    };
    return this.http.get<T>(`${environment.BASE_URL + url}`, httpOptions);
  }

  /**
   * Post with json
   * @param {string} url
   * @param body
   * @returns {Observable<any>}
   */
  post<T>(url: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.post<T>(`${environment.BASE_URL + url}`, JSON.stringify(body), httpOptions);
  }

  /**
   * @param {string} username
   * @param {string} password
   * @returns {Observable<User>}
   */
  login(username: string, password: string) {
    const httpParams = new HttpParams()
      .append('username', username)
      .append('password', password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true
    };
    return this.http.post<User>(`${environment.BASE_URL + environment.LOGIN_URL}`,
      httpParams.toString(),
      httpOptions);
  }

  logout() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true
    };
    const httpParams = new HttpParams();
    console.log(httpParams.toString());
    return this.http.post(`${environment.BASE_URL + environment.LOGOUT_URL}`, httpParams.toString(), httpOptions);
  }
}
