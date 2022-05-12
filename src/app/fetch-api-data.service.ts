/** # API CONNECTION ENDPOINT
 */

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';

//Declare the api url that will provide data to the client side of the app
const apiUrl = 'https://flexnitdb.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param userDetails
   * @returns POST apiUrl/users with `userDetails` as a header
   *          Pipes in errors, when catched.
   */
  //1. User Registration
  public userRegistration(userDetails: any): Observable<any> {
    //console.log(userDetails); //uncomment in case it needs testing
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param userDetails
   * @returns POST apiUrl/login with `userDetails` as a header
   *          Pipes in errors, when catched.
   */
  //2. User login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @returns GET apiURL/movies with authorization header
   *          Pipes in errors, when catched.
   */
  //3. Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * @param id
   * @returns GET apiUrl/movies/`id` with authorization header
   *          Pipes in errors, when catched
   */
  //4. Get one movie
  getMovie(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${id}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * @param name
   * @returns GET apiUrl/movies/directors/`name` with authorization header
   *          Pipes in errors, when catched
   */
  //5. Get director
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/directors/${name}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param genre
   * @returns GET apiUrl/movies/genres/`genre` with authorization header
   *          Pipes in errors, when catched
   */
  //6. Get genre
  getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/genres/${genre}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @returns GET apiUrl/users/`username` with authorization header
   *          `username` pulled from localStorage
   *          Pipes in errors, when catched
   */
  //7. Get user
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param id
   * @returns POST apiUrl/users/`username`/movies/`id` with authorization header
   *          `username` pulled from localStorage
   *           Pipes in errors, when catched
   */
  //8. Add a movie to favorites
  addFavorite(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${id}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param userData
   * @returns PUT apiUrl/users/`username` with `userData` and authorization as a header
   *          `username` pulled from localStorage
   *           Pipes in errors, when catched
   */
  //9. Edit user
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @returns DELETE apiUrl/users/`username` with authorization header
   *          `username` pulled from localStorage
   *           Pipes in errors, when catched
   */
  //10. Delete user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param id
   * @returns DELETE apiUrl/users/`username`/movies/`id` with authorization header
   *          `username`pulled from localStorage
   *           Pipes in errors, when catched
   */
  //11. Delete a movie from favorites
  deleteFavorites(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${id}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param error
   * @returns errors
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error ocurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
