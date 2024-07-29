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
  time: number = 30;

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
      this.list[4] = this.time;
    }
  }
  cb3Control() {
    this.list[2] = this.cb3Ischecked;
    this.baseService.nextdata(this.list);
  }
  sliderChange() {
    this.list[3] = this.level;
  }

  timeChange(value: number) {
    this.time = value;
    this.list[4] = this.time;
    console.log(this.time);
  }

  timeNegative() {
    if (this.time - 10 > 0) {
      this.time -= 10;
      this.list[4] = this.time;
      console.log(this.time);
    }
  }
  timePositive() {
    if (this.time < 9999) {
      this.time += 10;
      this.list[4] = this.time;
      console.log(this.time);
    }
  }

  inputLengthControl(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 4) {
      input.value = input.value.slice(0, 4);
      this.time = +input.value; // Angular model güncellemesi
    }
  }
}
