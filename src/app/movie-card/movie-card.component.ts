import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.setFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
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

  setFavorites(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.favorites = res.Favorites;
      console.log(res.Favorites);
      return this.favorites;
    });
  }

  isFav(title: string): boolean {
    return this.favorites.some((id) => id === title);
  }

  favStatus(movie: any): void {
    this.isFav(movie._id)
      ? this.removeFavorite(movie._id, movie.Title)
      : this.addFavorite(movie._id, movie.Title);
  }

  addFavorite(id: any, title: any): void {
    this.fetchApiData.addFavorite(id).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open(`${title} was added to your favorites!`, 'OK!', {
        duration: 3000,
      });
      this.setFavorites();
    });
  }

  removeFavorite(id: any, title: any): void {
    this.fetchApiData.deleteFavorites(id).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open(`${title} was removed from your favorites.`, 'OK!', {
        duration: 3000,
      });
      this.setFavorites();
    });
  }
}
