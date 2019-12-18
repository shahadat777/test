import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { DepartmentService } from 'src/app/services/department.service';
@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddDepComponent>,
    private service:DepartmentService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.resetForm();
  }
  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData = {
      departmentsID:0,
      departmentsName:''
    }
  }
  onSubmit(form:NgForm)
  {
 
   console.log(form.value);
   this.service.addDepartments(form.value).subscribe(res=>{
     
     this.resetForm(form);
     this.snackBar.open('Added Successfully', '', {
      duration:2000,
      verticalPosition:'top'
    });
   });
  }
}
