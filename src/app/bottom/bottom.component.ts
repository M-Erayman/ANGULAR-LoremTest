import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseService } from '../service/base.service';

@Component({
  selector: 'bottomComponent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bottom.component.html',
  styleUrl: './bottom.component.css',
})
export class BottomComponent {
  cb1Ischecked: boolean = false;
  cb2Ischecked: boolean = false;
  cb3Ischecked: boolean = false;
  isFocus: boolean = false;
  cbList: boolean[] = [false, false, false];

  constructor(private baseService: BaseService) {}

  ngOnInit() {
    this.baseService.onDataChangeFocus().subscribe((data: any) => {
      this.isFocus = data;
      console.log(data);
    });
  }

  cb1Control() {
    this.cbList[0] = this.cb1Ischecked;
    this.baseService.nextdata(this.cbList);
  }
  cb2Control() {
    this.cbList[1] = this.cb2Ischecked;
    this.baseService.nextdata(this.cbList);
  }
  cb3Control() {
    this.cbList[2] = this.cb3Ischecked;
    this.baseService.nextdata(this.cbList);
  }
}
