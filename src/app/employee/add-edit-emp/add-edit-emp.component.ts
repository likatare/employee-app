import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
})
export class AddEditEmpComponent implements OnInit {
  @Input() emp: any;

  employeeId!: string;
  employeeFirstName!: string;
  employeeLastName!: string;
  employeeAge!: string; //number?
  department!: string;
  dateOfJoining!: string;
  photoFileName!: string;
  photoFilePath!: string;

  departmentList: any = [];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList(): void {
    this.service.getAllDepartmentsNames().subscribe((data: any) => {
      this.departmentList = data;

      this.employeeId = this.emp.EmployeeId;
      this.employeeFirstName = this.emp.EmployeeFirstName;
      this.employeeLastName = this.emp.EmployeeLastName;
      this.employeeAge = this.emp.EmployeeAge;
      this.department = this.emp.Department;
      this.dateOfJoining = this.emp.DateOfJoining;
      this.photoFileName = this.emp.PhotoFileName;
      this.photoFilePath = this.service.PhotoUrl + this.photoFileName;
      console.log(this.photoFilePath)
    });
  }

  addEmployee(): void {
    var val = {
      EmployeeId: this.employeeId,
      EmployeeFirstName: this.employeeFirstName,
      EmployeeLastName: this.employeeLastName,
      EmployeeAge: this.employeeAge,
      Department: this.department,
      DateOfJoining: this.dateOfJoining,
      PhotoFileName: this.photoFileName,
    };

    this.service.addEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  updateEmployee(): void {
    var val = {
      EmployeeId: this.employeeId,
      EmployeeFirstName: this.employeeFirstName,
      EmployeeLastName: this.employeeLastName,
      EmployeeAge: this.employeeAge,
      Department: this.department,
      DateOfJoining: this.dateOfJoining,
      PhotoFileName: this.photoFileName,
    };

    this.service.updateEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  uploadPhoto(event: any): void {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data: any) => {
      this.photoFileName = data.toString();
      this.photoFilePath = this.service.PhotoUrl + this.photoFileName;
    });
  }
}
