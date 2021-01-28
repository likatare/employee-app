import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  employeeList: any[] = [];
  modalTitle!: string;
  activateAddEditEmpComp: boolean = false;
  emp!: any;

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(): void {
    this.emp = {
      EmployeeId: 0,
      EmployeeFirstName: '',
      EmployeeLastName: '',
      EmployeeAge: 0,
      Department: '',
      DateOfJoining: '',
      PhotoFileName: 'anonymous.png',
    };

    this.modalTitle = 'Add Employee';
    this.activateAddEditEmpComp = true;
  }

  editClick(item: any): void {
    this.emp = item;
    this.modalTitle = 'Edit Employee';
    this.activateAddEditEmpComp = true;
  }

  deleteClick(item: any): void {
    if (confirm('Are you sure you want to delete?')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe((data) => {
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

  closeClick(): void {
    this.activateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmployeesList().subscribe((data) => {
      this.employeeList = data;
    });
  }
}
