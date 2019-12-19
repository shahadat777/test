import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Departments } from '../Models/department-model';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http:HttpClient) { }
  formData: Departments;
  readonly APIUrl="http://localhost:3226/api";
  getDepList(): Observable<Departments[]> {
    return this.http.get<Departments[]>(this.APIUrl + '/Departments');
  }
  deleteDepartment(id: number){
    return this.http.delete(this.APIUrl+'/Departments/'+id);
  }
  updateDepartment(dep:Departments){
    return this.http.put(this.APIUrl+'/Departments/'+dep.departmentsID,dep);
  }
  addDepartments(dep:Departments){
    console.log(dep);
    return this.http.post(this.APIUrl+'/Departments',dep);
  }
  private _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }
}
