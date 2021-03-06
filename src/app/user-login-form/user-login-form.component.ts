import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Input sets `userData` to whatever the user inputs in the form fields.
   */
  @Input() userData = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * > Runs [[userLogin]] passing [[userData]] forward<br/>
   * > Sets localStorage `user` and `token` to the response from [[userLogin]]<br/>
   * > Opens a snackbar on confirmation<br/>
   * > Navigate to [[movies]]
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        this.dialogRef.close();
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        this.snackBar.open('Welcome!', 'OK!', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
