import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Models/employee-model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  formData:Employee;
  readonly APIUrl="http://localhost:3226/api";
  getEmpList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.APIUrl + '/Departments');
  }
  deleteEmpartment(id: number){
    return this.http.delete(this.APIUrl+'/Departments/'+id);
  }
  updateEmpartment(emp:Employee){
    return this.http.put(this.APIUrl+'/Departments/'+emp.EmployeeID,emp);
  }
  addEmpartment(emp:Employee){
    console.log(emp);
    return this.http.post(this.APIUrl+'/Departments',emp);
  }
  private _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }
}
