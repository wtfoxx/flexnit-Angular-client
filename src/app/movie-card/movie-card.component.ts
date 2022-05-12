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

  /**
   * > Fetches movies with [[getMovies]]<br/>
   * > Runs [[setFavorites]]
   */
  ngOnInit(): void {
    this.getMovies();
    this.setFavorites();
  }

  /**
   * > Runs [[getAllMovies]] to fetch all movies in database<br/>
   * > Sets [[movies]] as movies fetched from database
   * @returns [[movies]]
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //console.log(this.movies);
      return this.movies;
    });
  }

  /**
   *
   * @param name
   * @param bio
   * @param birth
   * > Opens the [[DirectorViewComponent]] as a dialog passing `name`, `bio` and `birth` to it
   */
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

  /**
   *
   * @param name
   * @param description
   * > Opens the [[GenreViewComponent]] as a dialog passing `name` and `description` to it
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   *
   * @param title
   * @param year
   * @param description
   * > Opens the [[SynopsisViewComponent]] as a dialog passing `title`, `year` and `description` to it
   */
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

  /**
   * > Gets user from localStorage and set [[favorites]] the same as the current user's favorites<br/>
   * @returns [[favorites]]
   */
  setFavorites(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.favorites = res.Favorites;
      //console.log(res.Favorites);
      return this.favorites;
    });
  }

  /**
   *
   * @param title
   * > Tells if said `title` is present in [[favorites]]
   * @returns
   */
  isFav(title: string): boolean {
    return this.favorites.some((id) => id === title);
  }

  /**
   *
   * @param movie
   * > Runs [[isFav]] and runs either [[removeFavorite]] or [[addFavorite]] dependning on if the `movie` is or not in [[favorites]]
   */
  favStatus(movie: any): void {
    this.isFav(movie._id)
      ? this.removeFavorite(movie._id, movie.Title)
      : this.addFavorite(movie._id, movie.Title);
  }

  /**
   *
   * @param id
   * @param title
   * > Runs [[addFavorite]] passing `id` to it<br/>
   * > Opens a snackbar featuring `title`
   * @returns [[setFavorites]] to refresh [[favorites]]
   */
  addFavorite(id: any, title: any): void {
    this.fetchApiData.addFavorite(id).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open(`${title} was added to your favorites!`, 'OK!', {
        duration: 3000,
      });
      this.setFavorites();
    });
  }

  /**
   *
   * @param id
   * @param title
   * > Runs [[removeFavorites]] passing `id` to it<br/>
   * > Opens a snackbar featuring `title`
   * @returns [[setFavorites]] to refresh [[favorites]]
   */
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
