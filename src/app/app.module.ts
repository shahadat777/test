import { BrowserModule } from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { AddDepComponent } from './department/add-dep/add-dep.component';
import { EditDepComponent } from './department/edit-dep/edit-dep.component';
import { ShowDepComponent } from './department/show-dep/show-dep.component';
import { DepartmentService } from './services/department.service';
import { EmployeeService } from './services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent} from './employee/employee.component';
import {HttpClientModule} from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule,MatIconModule, MatButtonModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    AddDepComponent,
    EditDepComponent,
    ShowDepComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule
  
  ],
  providers: [DepartmentService,EmployeeService],
  bootstrap: [AppComponent],
  entryComponents:[AddDepComponent,EditDepComponent]
})
export class AppModule { }
