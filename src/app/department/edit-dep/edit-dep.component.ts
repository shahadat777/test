import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { DepartmentService } from 'src/app/services/department.service';
@Component({
  selector: 'app-edit-dep',
  templateUrl: './edit-dep.component.html',
  styleUrls: ['./edit-dep.component.css']
})
export class EditDepComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<EditDepComponent>,
    private snackBar:MatSnackBar,
    private service:DepartmentService) { }

  ngOnInit() {
  }
  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');
  }
  onSubmit(form:NgForm){
    this.service.updateDepartment(form.value).subscribe(res=>{
      this.snackBar.open('update successfully','',{
        duration:5000,
        verticalPosition:'top'
      })
    })
  }
}
