import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

import {MatSnackBar} from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddEmpComponent>,
    private service:EmployeeService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.resetForm();
    this.dropdownRefresh();
  }
  public listItems: Array<string> = [];
  dropdownRefresh(){
    this.service.getDepDropDownValues().subscribe(data=>{
      console.log(data);
      data.forEach(element => {
        this.listItems.push(element["departmentsName"]);
      });
    });
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();

    this.service.formData = {
      employeeID:0,
      EmployeeName:'',
      Department:'',
      MailID:'',
      DOJ:null
    }
  }
  onSubmit(form:NgForm){

    form.value.DOJ = new Date(form.value.DOJ).getFullYear().toString()
     +'-'+(new Date(form.value.DOJ).getMonth() +1).toString()
     +'-'+new Date(form.value.DOJ).getDate().toString();
     this.service.addEmpartment(form.value).subscribe(res=>
      {
        this.resetForm(form);
        this.snackBar.open('Save Successfully', '', {
          duration:5000,
          verticalPosition:'top'
        });
      }
      )
    }
  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');
  }
}
