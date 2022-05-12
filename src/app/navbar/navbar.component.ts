import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user = {};

  constructor(public router: Router) {}

  ngOnInit(): void {
    const username = localStorage.getItem('user');
    this.user = [username];
    console.log(this.user);
  }

  toProfile(): void {
    this.router.navigate(['profile']);
  }

  toFavorites(): void {
    this.router.navigate(['favorites']);
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['welcome']);
  }

  toHome(): void {
    this.router.navigate(['movies']);
  }
}
