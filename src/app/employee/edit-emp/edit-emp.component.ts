import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<EditEmpComponent>,
    private service:EmployeeService,
    private snackBar:MatSnackBar) { }

    
public listItems: Array<string> = [];

  ngOnInit() {
    this.dropdownRefresh();
  }

  dropdownRefresh(){
    this.service.getDepDropDownValues().subscribe(data=>{
      console.log(data);
      data.forEach(element => {
        
        this.listItems.push(element["departmentsName"]);
      });
    })
  }

 

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');
  }


  onSubmit(form:NgForm){
    this.service.updateEmpartment(form.value).subscribe(res=>{
      this.snackBar.open('Update Successfully','',{
        duration:5000,
        verticalPosition:'top'

      })
    })
  }

}
