import { Component, EventEmitter, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  cbList: boolean[] = [false, false, false];

  @Output() setAppEvent = new EventEmitter<boolean[]>();

  constructor() {}
  setAppComponent() {
    this.setAppEvent.emit(this.cbList);
  }

  cb1Control() {
    // console.log(this.cb1Ischecked);
    this.cbList[0] = this.cb1Ischecked;
    // console.log(this.cbList);
     this.setAppComponent();
  }
  cb2Control() {
    // console.log(this.cb1Ischecked);
    this.cbList[1] = this.cb2Ischecked;
    // console.log(this.cbList);
     this.setAppComponent();
  }
  cb3Control() {
    // console.log(this.cb1Ischecked);
    this.cbList[2] = this.cb3Ischecked;
    // console.log(this.cbList);
     this.setAppComponent();
  }
}
