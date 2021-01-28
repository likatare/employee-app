import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'http://localhost:61384/api';
  readonly PhotoUrl = 'http://localhost:61384/Photos/';

  constructor(private http: HttpClient) {}

  //Department API
  getDepartmentList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Department');
  }

  addDepartment(val: any) {
    return this.http.post<any>(this.APIUrl + '/Department', val);
  }

  updateDepartment(val: any) {
    return this.http.put<any>(this.APIUrl + '/Department', val);
  }

  deleteDepartment(val: any) {
    return this.http.delete(`${this.APIUrl}/Department/${val}`);
  }

  //Employee API

  getEmployeesList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Employee');
  }

  addEmployee(val: any) {
    return this.http.post<any>(this.APIUrl + '/Employee', val);
  }

  updateEmployee(val: any) {
    return this.http.put<any>(this.APIUrl + '/Employee', val);
  }

  deleteEmployee(val: any) {
    return this.http.delete(`${this.APIUrl}/Employee/${val}`);
  }

  //Api For uploading photo

  uploadPhoto(val: any) {
    return this.http.post<any>(this.APIUrl + '/Employee/SaveFile', val);
  }

  //Api for get all departmen names
  getAllDepartmentsNames(): Observable<any[]> {
    return this.http.get<any[]>(
      this.APIUrl + '/Employee/GetAllDepartmentNames'
    );
  }
}
