import { Component, Input, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'middleComponent',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './middle.component.html',
  styleUrl: './middle.component.css',
})
export class MiddleComponent {
  title = 'Harf';
  randomText = faker.lorem.sentence();
  enteredText = '';
  @Input() buttonLCheckListMid: boolean[] = [false, false, false];

  ngOnInit() {}

  onClick() {
    // window.location.reload();
    this.randomText = faker.lorem.sentence();
  }

  getInputValue(value: string) {
    this.enteredText = value;
    // console.log(this.enteredText);
    console.log(this.buttonLCheckListMid);
  }

  compare(randomLetter: string, enteredLetter: string) {
    if (!enteredLetter) {
      return 'pending';
    } else if (randomLetter === enteredLetter) {
      //  (randomLetter = randomLetter.toLowerCase()) ===
      // enteredLetter = enteredLetter.toLowerCase()
      return 'correct';
    } else {
      return 'incorrect';
    }
  }
}
