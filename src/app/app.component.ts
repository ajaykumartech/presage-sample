import { Component } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports:[RouterOutlet,MatSidenavContainer,MatSidenavContent,MatNavList,MatSidenav],
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'presage-sample';
  constructor(private router: Router) {}

navigateTo(path: string): void {
  this.router.navigate([path]);
}
}
