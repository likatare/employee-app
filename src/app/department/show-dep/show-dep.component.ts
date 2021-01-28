import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css'],
})
export class ShowDepComponent implements OnInit {
  departmentList: any = [];
  modalTitle!: string;
  activateAddEditDepComp: boolean = false;
  dep: any;

  departmentIdFilter: string = '';
  departmentNameFilter: string = '';
  departmentListWithoutFilter: any = [];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.refreshDepartmentList();
  }

  addClick(): void {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: '',
    };

    this.modalTitle = 'Add Department';
    this.activateAddEditDepComp = true;
  }

  editClick(item: any): void {
    this.dep = item;
    this.modalTitle = 'Edit Department';
    this.activateAddEditDepComp = true;
  }

  deleteClick(item: any): void {
    if (confirm('Are you sure you want to delete?')) {
      this.service.deleteDepartment(item.DepartmentId).subscribe((data) => {
        console.log(item.DepartmentId);
        alert(data.toString());
        this.refreshDepartmentList();
      });
    }
  }

  closeClick(): void {
    this.activateAddEditDepComp = false;
    this.refreshDepartmentList();
  }

  refreshDepartmentList(): void {
    this.service.getDepartmentList().subscribe((data) => {
      this.departmentList = data;
      this.departmentListWithoutFilter = data;
    });
  }

  filterFn(): any {
    var departmentIdFilter = this.departmentIdFilter;
    var departmentNameFilter = this.departmentNameFilter;
    console.log(this.departmentNameFilter);
    this.departmentList = this.departmentListWithoutFilter.filter(function (
      el: any
    ) {
      return (
        el.DepartmentId.toString()
          .toLowerCase()
          .includes(departmentIdFilter.toString().trim().toLowerCase()) &&
        el.DepartmentName.toString()
          .toLowerCase()
          .includes(departmentNameFilter.toString().trim().toLowerCase())
      );
    });
  }

  sortResult(property: string, ascending: boolean): void {
    this.departmentList = this.departmentListWithoutFilter.sort(function (
      a: any,
      b: any
    ) {
      if (ascending) {
        console.log(a[property]);
        return a[property] > b[property]
          ? 1
          : a[property] < b[property]
          ? -1
          : 0;
      } else {
        return b[property] > a[property]
          ? 1
          : b[property] < a[property]
          ? -1
          : 0;
      }
    });
  }
}
