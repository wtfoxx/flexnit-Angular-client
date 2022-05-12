import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoriteless',
  templateUrl: './favoriteless.component.html',
  styleUrls: ['./favoriteless.component.scss'],
})
export class FavoritelessComponent implements OnInit {
  constructor(public router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['movies']);
    this.dialog.closeAll();
  }
}
