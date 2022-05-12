# Flexnit Angular Client

Access the live deployed version [here](https://wtfoxx.github.io/flexnit-Angular-client/welcome)!

Flexnit Angular is a revisit on my previous [Flexnit React](https://github.com/wtfoxx/flexnit-client) but using Angular this time.
It reads from the same dedicated API [Movie API](https://github.com/wtfoxx/movie-api).

## Key features
- A welcome screen where users can register or login.
- Upon registering they will automatically be prompted to login
- When logged in, the user can see the list of movies
- All movies can be favorited
- User can see information about each movie's director, genre or synopsis
- By clicking their profile, users can see their profile information or see their favorites
- In their profile, users can alter information about their account or delete the account
- The list of favorites, if empty, will prompt you to go back to the list of movies
- If you have favorites, it will show a list of your favorites, where you can see all information and also unfavorite them


## Local server
If using it locally, please use either ports 4200, 8080 or 1234, as those are the ones allowed by CORS in my API. To choose a port when using Angular simply type `ng serve --port 1234`.
To start off, install any dependencies by running
```npm install
```
Follow up by installing Angular CLI
```npm install -g @angular/cli
```
And finally, serve it in the desired port
```ng serve --port 1234
```



