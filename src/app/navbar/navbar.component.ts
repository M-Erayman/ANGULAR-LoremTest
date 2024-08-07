import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import trlang from '../../assets/tr.json';
import enlang from '../../assets/en.json';
import { BaseService } from '../service/base.service';

@Component({
  selector: 'navbarComponent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  personNamePlaceHolder: string = '';
  cbox: boolean = false;
  translations: any = {
    tr: trlang,
    en: enlang,
  };
  list: any[] = [false];

  constructor(
    private baseService: BaseService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // this.updatePersonNamePlaceHolder();
    //  debugger;
    if (isPlatformBrowser(this.platformId)) {
      const savedValue = localStorage.getItem('languageValue');
      if (savedValue !== null) {
        this.cbox = JSON.parse(savedValue);
        this.list[0] = this.cbox;
        this.baseService.nextDataLang(this.list);
        // console.log('concbox : ' + this.cbox);
        // console.log('conlist : ' + this.list);
        this.updatePersonNamePlaceHolder();
      }
    }
  }

  // ngOnInit() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const savedValue = localStorage.getItem('toggleValue');
  //     if (savedValue !== null) {
  //       this.cbox = JSON.parse(savedValue);
  //     }
  //   }
  // }

  cboxChange() {
    this.updatePersonNamePlaceHolder();
    this.list[0] = this.cbox;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('languageValue', JSON.stringify(this.cbox));
      this.baseService.nextDataLang(this.list);
    }
    // console.log('cbox : ' + this.cbox);
    // console.log('list : ' + this.list);
  }

  private updatePersonNamePlaceHolder() {
    this.personNamePlaceHolder = this.currentTranslations.navbarPlaceHolder;
  }

  get currentTranslations() {
    return this.cbox ? this.translations.en : this.translations.tr;
  }
}
