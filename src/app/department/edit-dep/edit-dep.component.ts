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
 
}
