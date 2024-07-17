import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BaseService } from '../service/base.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'middleComponent',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './middle.component.html',
  styleUrl: './middle.component.css',
})
export class MiddleComponent {
  title = 'Harf';
  randomText = '';
  enteredText = '';
  isZoomed: boolean = false;
  list: boolean[] = [];
  beforeZoom: string = 'Please choose your option and start the game...';
  afterZoom: string = 'Please enter the text...';
  enterWatcher: boolean = false;

  constructor(private baseService: BaseService) {
    this.onClick();
  }

  // Sayfa baslangicinda calisir...
  ngOnInit() {
    this.baseService.onDataChange().subscribe((data: any) => {
      //console.log(data);
      this.list = data;
    });
    this.onClick;
  }

  enterKeydown() {
    this.onClick();
  }

  onClick() {
    // window.location.reload();
    this.randomText = faker.lorem.sentence();
    this.randomText = this.randomText.slice(0, -1);
    if (this.list[0]) {
      console.log(this.randomText.length);
      this.randomText = this.convertThirdToUpper(this.randomText); // Ucte birini buyuk harf yapar (GPT)...
    }
    console.log(this.enteredText);
    this.enteredText = '';
  }

  btnStart() {
    this.isZoomed = !this.isZoomed;
    this.baseService.nextDataFocus(this.isZoomed);
  }

  compare(randomLetter: string, enteredLetter: string) {
    if (!enteredLetter) {
      return 'pending';
    } else if (randomLetter === enteredLetter && this.list[0]) {
      return 'correct';
    } else if (
      (randomLetter = randomLetter.toLowerCase()) ===
        (enteredLetter = enteredLetter.toLowerCase()) &&
      !this.list[0]
    ) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  convertThirdToUpper(str: string) {
    // String'i bir diziye dönüştür
    let chars = str.split('');

    // Harf olmayan karakterleri ayıkla ve sadece harfleri içeren bir dizi oluştur
    let letters = chars.filter((char) => /[a-zA-Z]/.test(char));

    // Üçte biri kadar harfi büyük harf yapmamız gerektiğini hesapla
    let numToUpper = Math.ceil(letters.length / 3);

    // Rastgele harfleri seçip büyük harfe çevir
    for (let i = 0; i < numToUpper; i++) {
      let index = Math.floor(Math.random() * letters.length);
      letters[index] = letters[index].toUpperCase();
    }

    // Harf olmayan karakterleri yerinde bırakmak için orijinal diziyi güncelle
    let letterIndex = 0;
    for (let i = 0; i < chars.length; i++) {
      if (/[a-zA-Z]/.test(chars[i])) {
        chars[i] = letters[letterIndex];
        letterIndex++;
      }
    }
    // Diziyi tekrar string'e dönüştür
    return chars.join('');
  }
}
