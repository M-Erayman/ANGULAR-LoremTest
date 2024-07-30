import { Component, ElementRef, Renderer2 } from '@angular/core';
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
  list: any[] = [];
  beforeZoom: string = 'Please choose your option and start the game...';
  afterZoom: string = 'Please enter the text...';
  enterWatcher: boolean = false;
  seconds: number = 10;
  intervalId: any;

  ngOnDestroy(): void {
    this.clearTimer();
  }

  startTimer(): void {
    this.clearTimer(); // Önceki zamanlayıcıyı temizle
    this.intervalId = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.clearTimer();
        if (this.isZoomed) {
          this.isZoomed = false;
        }
        this.baseService.nextDataFocus(this.isZoomed);
        this.seconds = this.list[4];
      } 
    }, 1000);
  }

  clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  constructor(
    private baseService: BaseService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
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

  // this function focus on input when isZoomen=true
  ngAfterViewChecked() {
    const inputElement = this.el.nativeElement.querySelector('input');
    if (inputElement) {
      if (this.isZoomed) {
        this.renderer.selectRootElement(inputElement).focus();
      }
    }
  }

  onClick() {
    // window.location.reload();
    this.randomText = faker.lorem.sentence();
    this.randomText = this.randomText.slice(0, -1);
    if (this.list[0]) {
      // console.log(this.randomText.length);
      this.randomText = this.convertThirdToUpper(this.randomText); // Ucte birini buyuk harf yapar (GPT)...
    }
    //console.log(this.enteredText);
    this.enteredText = '';
    //console.log(this.list);
  }

  btnStart() {
    this.isZoomed = !this.isZoomed;
    this.baseService.nextDataFocus(this.isZoomed);
    this.onClick();
    console.log(this.list);
    if (this.list[1]) {
      this.seconds = this.list[4];
      this.startTimer();
    }
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
    letters[0] = letters[0].toLowerCase();
    if (this.list[3] === 100) {
      for (let i = 0; i < letters.length; i++) {
        letters[i] = letters[i].toUpperCase();
      }
    } else {
      // Üçte biri kadar harfi büyük harf yapmamız gerektiğini hesapla
      // console.log(Math.ceil((letters.length * this.list[3]) / 100));
      let numToUpper = Math.ceil((letters.length * this.list[3]) / 100);

      // Rastgele harfleri seçip büyük harfe çevir
      for (let i = 0; i < numToUpper; ) {
        let index = Math.floor(Math.random() * letters.length);
        if (letters[index] === letters[index].toLowerCase()) {
          letters[index] = letters[index].toUpperCase();
          i++;
        }
        //i--;
        // console.log(letters[index]);
      }
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
