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

  /**
   * > Fetches `username` from localStorage<br/>
   * > Sets [[user]] as `username`
   */
  ngOnInit(): void {
    const username = localStorage.getItem('user');
    this.user = [username];
    //console.log(this.user);
  }

  /**
   * > Navigates to [[profile]]
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * > Navigate to [[favorites]]
   */
  toFavorites(): void {
    this.router.navigate(['favorites']);
  }

  /**
   * > Clears localStorage and routes to [[welcome]]
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  /**
   * > Navigates to [[movies]]
   */
  toHome(): void {
    this.router.navigate(['movies']);
  }
}
