import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};

  /**
   * Input sets `userData` to whatever the user inputs in the form fields.
   */
  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * > Runs [[getUser]]
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * > Gets user from [[getUser]] <br/>
   * > Sets [[user]] as the result from [[getUser]]<br/>
   * @returns [[user]]
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user = res;
      //console.log(this.user);
      return this.user;
    });
  }

  /**
   * > Opens CATAAS on a new tab
   */
  reload(): void {
    window.open('https://cataas.com/#/');
  }

  /**
   * > Runs [[editUser]] <br/>
   * > Sets localStorage `user` to be the response from [[editUser]] username<br/>
   * > Opens a snackbar on success
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((res) => {
      localStorage.setItem('user', res.Username);
      this.snackBar.open('Your profile was successfully updated!', 'OK!', {
        duration: 5000,
      });
    });
  }

  /**
   * > Opens a confirmation window<br/>
   * > If confirmed, runs [[deleteUser]] <br/>
   * > Clears localStorage <br/>
   * > Opens a snackbar <br/>
   * > Navigates to [[welcome]] after a timeOut
   */
  deleteUser(): void {
    if (
      confirm(
        'This is irreversible. You can always register again, though, no pressure.'
      )
    ) {
      this.fetchApiData.deleteUser().subscribe((res) => {
        console.log(res);
      });

      localStorage.clear();
      this.snackBar.open('Your profile was deleted. Goodbye!', 'OK!', {
        duration: 3000,
      });
      setTimeout(() => {
        this.router.navigate(['welcome']);
      }, 1000);
    }
  }
}
