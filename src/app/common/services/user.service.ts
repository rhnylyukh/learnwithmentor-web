import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Register } from '..//models/register';
import { Role } from '../models/role';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  roleName: string;
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private url = `${environment.apiUrl}user`;


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      catchError(this.handleError<User[]>(`getUsers`))
    );
  }

  getUser(id: number) {
    return this.http.get(`${this.url}/${id}`).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getUserByRole_id(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/inrole/${id}`).pipe(
      catchError(this.handleError<User[]>(`getUserbyrole`))
    );
  }

  updateUser(user: User) {
    return this.http.put(`${this.url}/${user.Id}`, user).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  registerUser(register: Register) {
    const body: Register = {
      FirstName: register.FirstName,
      LastName: register.LastName,
      Password: register.Password,
      Email: register.Email
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.url, body,{headers : reqHeader}).pipe(
      catchError(this.handleError<User>('registerUser'))
    );
  }

  blockUserById(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}/roles`).pipe(
      catchError(this.handleError<Role[]>('getRole'))
    );
  }

  userAuthentication(email, password) {
    const data = 'email=' + email + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.url + '/token', data, { headers: reqHeader });
  }

  search(param: string, roleName: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/search?q=${param}&role=${roleName}`).pipe(
      catchError(this.handleError<User[]>(`searchUsers`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
