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

  /**
   * > Gets [[currentUser]]<br/>
   * > Gets [[userFavorites]]<br/>
   * > Runs [[favoriteless]] on a **timeOut** to wait until userFavorites finishes loading.
   */
  ngOnInit(): void {
    this.currentUser();
    this.userFavorites();
    setTimeout(() => {
      this.favoriteless();
    }, 1000);
  }

  /**
   * > Opens the [[FavoritelessComponent]] dialog in case the user has no favorites in their collection.
   */
  favoriteless(): void {
    if (this.favorites.length === 0) {
      this.dialog.open(FavoritelessComponent, {
        width: '280px',
      });
    }
  }

  /**
   * > Pulls `user` from localStorage<br/>
   * > if there is a user, fetches the uer with [[getUser]] and sets this.user as the fetched user<br/>
   * @returns [[user]]
   */
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

  /**
   * > Fetches [[getAllMovies]] and filters only the movies included in this.user favorites list<br/>
   * > Sets [[favorites]] as the array of movies found in [[user]] favorites list
   * @returns [[favorites]]
   */
  userFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favorites = res.filter((movie: any) => {
        return this.user.Favorites.includes(movie._id);
      });
      console.log(this.favorites);
      return this.favorites;
    });
  }

  /**
   *
   * @param id
   * @param title
   * > Fetches [[deleteFavorites]] using `id` in the header<br/>
   * > Opens a snack bar featuring `title`
   * @returns [[userFavorites]] to refresh the user's favorites
   */
  removeFavorite(id: string, title: string): void {
    this.fetchApiData.deleteFavorites(id).subscribe((res: any) => {
      this.snackBar.open(`${title} was removed from you favorites.`, 'OK!', {
        duration: 2000,
      });
      this.ngOnInit();
    });
    return this.userFavorites();
  }

  /**
   *
   * @param name
   * @param bio
   * @param birth
   * > Opens dialog [[DirectorViewComponent]] passing `name`, `bio` and `birth` forward to it
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
   * > Opens dialog [[GenreViewComponent ]]passing `name` and `description` forward to it
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
   * > Opens dialog [[SynopsisViewComponent]] passing `title`, year` and `description` forward to it
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
}
