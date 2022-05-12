import { Component, OnInit, Input } from '@angular/core';

//This will be used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//This import brings the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

//This is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  //This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        //Logic form a successful registration goes here (WIP)
        this.dialogRef.close(); //Closes the modal on success!
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        });
        setTimeout(() => {
          this.dialog.open(UserLoginFormComponent, {
            width: '280px',
          });
        }, 500);
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
