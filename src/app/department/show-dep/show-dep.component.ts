import {MatSnackBar} from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { DepartmentService } from 'src/app/services/department.service';
import { Departments} from 'src/app/Models/department-model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddDepComponent} from 'src/app/department/add-dep/add-dep.component';
import { EditDepComponent } from '../edit-dep/edit-dep.component';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['Options', 'departmentsID', 'departmentsName'];
  @ViewChild(MatSort, null) sort: MatSort;
  constructor(private service: DepartmentService,
    private dialog:MatDialog,private snackBar:MatSnackBar) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshDepList();
      });
     }

  ngOnInit() {
    this.refreshDepList();
  }
  applyFilter(filtervalue:  string){
    this.listData.filter= filtervalue.trim().toLocaleLowerCase();
  }
  refreshDepList(){
    // var dummyData = [{DepartmentID:1, DepartmentName:"IT"},
    // {DepartmentID:2, DepartmentName:"Finance"}] 
    // this.listData = new MatTableDataSource(dummyData);
    this.service.getDepList().subscribe(data=>{
      this.listData=new MatTableDataSource(data);
      this.listData.sort= this.sort;
    });
  }
  onEdit(dep:Departments){
    console.log(dep);
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.width= "70%";
    this.dialog.open(EditDepComponent, dialogConfig);
  }
  onDelete(id:number){
    console.log(id);
    if(confirm('Are you sure to delete??')){
      this.service.deleteDepartment(id).subscribe(res=>{
        this.refreshDepList();
        this.snackBar.open('Deleted Successfully', '', {
          duration:5000,
          verticalPosition:'top'
        });
      });
    }
  }
  onAdd(){
    const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus= true;
dialogConfig.width= "70%";
this.dialog.open(AddDepComponent, dialogConfig);
  }
}
