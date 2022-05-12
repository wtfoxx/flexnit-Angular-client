import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { FavoritelessComponent } from '../favoriteless/favoriteless.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  user: any = {};
  favorites: any[] = [];
  username: any = localStorage.getItem('user');

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentUser();
    this.userFavorites();
    setTimeout(() => {
      this.favoriteless();
    }, 1000);
  }

  favoriteless(): void {
    if (this.favorites.length === 0) {
      this.dialog.open(FavoritelessComponent, {
        width: '280px',
      });
    }
  }

  currentUser(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  userFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favorites = res.filter((movie: any) => {
        return this.user.Favorites.includes(movie._id);
      });
      console.log(this.favorites);
      return this.favorites;
    });
  }

  removeFavorite(id: string, title: string): void {
    this.fetchApiData.deleteFavorites(id).subscribe((res: any) => {
      this.snackBar.open(`${title} was removed from you favorites.`, 'OK!', {
        duration: 2000,
      });
      this.ngOnInit();
    });
    return this.userFavorites();
  }

  openDirector(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px',
    });
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  openSynopsis(title: string, year: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        Year: year,
        Description: description,
      },
      width: '500px',
    });
  }
}
