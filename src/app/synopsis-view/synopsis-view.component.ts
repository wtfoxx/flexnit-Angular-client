import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss'],
})
export class SynopsisViewComponent implements OnInit {
  constructor(
    /**
     * @inject passes information from the source page (movie-card or favorites) into the dialog
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Year: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
