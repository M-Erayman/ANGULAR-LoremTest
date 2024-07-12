import { Component, Input, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BaseService } from '../service/base.service';
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
  list: boolean[] = [];
  constructor(private baseService: BaseService) {}

  // Sayfa baslangicinda calisir...
  ngOnInit() {
    this.baseService.onDataChange().subscribe((data: any) => {
      console.log(data);
      this.list = data;
    });
  }

  onClick() {
    // window.location.reload();
    this.randomText = faker.lorem.sentence();
  }

  getInputValue(value: string) {
    this.enteredText = value;
    // console.log(this.enteredText);
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
