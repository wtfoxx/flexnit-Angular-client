import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * This comment _supports_ [Markdown](https://marked.js.org/)
 */

@Component({
  selector: 'app-favoriteless',
  templateUrl: './favoriteless.component.html',
  styleUrls: ['./favoriteless.component.scss'],
})
export class FavoritelessComponent implements OnInit {
  constructor(public router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Used in the button to send user back to movies page when there are no favorites on the list
   * Closes all dialogs upon clicking
   */
  goBack(): void {
    this.router.navigate(['movies']);
    this.dialog.closeAll();
  }
}
