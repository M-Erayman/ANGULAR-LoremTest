import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseService } from '../service/base.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'bottomComponent',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressBarModule],
  templateUrl: './bottom.component.html',
  styleUrl: './bottom.component.css',
})
export class BottomComponent {
  cb1Ischecked: boolean = false;
  cb2Ischecked: boolean = false;
  cb3Ischecked: boolean = false;
  isFocus: boolean = false;
  list: any[] = [false, false, false];
  level: number = 50;
  time: number = 0;

  constructor(private baseService: BaseService) {}

  ngOnInit() {
    this.baseService.onDataChangeFocus().subscribe((data: any) => {
      this.isFocus = data;
      //console.log(data);
    });
    this.list[3] = this.level;
  }

  cb1Control() {
    this.list[0] = this.cb1Ischecked;
    this.baseService.nextdata(this.list);
    //console.log(this.level);
  }
  cb2Control() {
    this.list[1] = this.cb2Ischecked;
    this.baseService.nextdata(this.list);
    if (this.cb2Ischecked) {
    }
  }
  cb3Control() {
    this.list[2] = this.cb3Ischecked;
    this.baseService.nextdata(this.list);
  }
  sliderChange() {
    this.list[3] = this.level;
  }
  timerChange() {
    this.list[4] = this.time;
  }
}
