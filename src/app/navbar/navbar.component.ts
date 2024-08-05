import { Component } from '@angular/core';

@Component({
  selector: 'navbarComponent',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  personName: string = 'No name';
}
