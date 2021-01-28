import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css'],
})
export class AddEditDepComponent implements OnInit {
  @Input() dep: any;
  departmentId!: string;
  departmentName!: string;

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.departmentId = this.dep.DepartmentId;
    this.departmentName = this.dep.DepartmentName;
  }

  addDepartment(): void {
    var val = {
      DepartmentId: this.departmentId,
      DepartmentName: this.departmentName,
    };

    this.service.addDepartment(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  updateDepartment(): void {
    var val = {
      DepartmentId: this.departmentId,
      DepartmentName: this.departmentName,
    };

    this.service.updateDepartment(val).subscribe((res) => {
      alert(res.toString());
    });
  }
}
