import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatSort, MatDialogConfig, MatPaginator } from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { Employee } from 'src/app/Models/employee-model';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  listData :MatTableDataSource<any>;
  displayedColumns : string[] = ['Options', 'employeeID', 
  'employeeName', 'department', 'mailID', 'doj']
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator,null) paginator: MatPaginator;
  constructor(private service: EmployeeService,
     private dialog:MatDialog,private snackBar:MatSnackBar,private dialogService:DialogService) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshEmpList();
      })
     }
    
  ngOnInit() {
    this.refreshEmpList();
  }
  refreshEmpList(){
    this.service.getEmpList().subscribe(data => {
      this.listData  = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
      }
      applyFilter(filtervalue:  string){
        this.listData.filter= filtervalue.trim().toLocaleLowerCase();
      }
      onAdd(){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus= true;
        dialogConfig.width= "70%";
        this.dialog.open(AddEmpComponent, dialogConfig);
        
          }
          onEdit(emp: Employee){
            this.service.formData = emp;
            const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus= true;
        dialogConfig.width= "70%";
        this.dialog.open(EditEmpComponent, dialogConfig);
          }
          onDelete(id:number){
            console.log(id);
            // if(confirm('Are you sure to delete??')){
            //   this.service.deleteEmpartment(id).subscribe(res=>{
            //     this.refreshEmpList();
            //     this.snackBar.open('Deleted Successfully', '', {
            //       duration:5000,
            //       verticalPosition:'top'
            //     });
            //   });
            // }
            this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
            .afterClosed().subscribe(res =>{
              if(res){
                this.service.deleteEmpartment(id).subscribe(res=>{
                     this.refreshEmpList();
                     this.snackBar.open('Deleted Successfully', '', {
                        duration:5000,
                        verticalPosition:'top'
                      });
                    });
              }
            })
          }


 
}