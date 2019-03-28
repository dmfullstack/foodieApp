import { Restaurant } from './restaurant';
import { LocationEntity } from './locationEntity';
import { catchError } from 'rxjs/operators/catchError';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { AlertService } from './../alert/alert.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection } from './collection';
import { map } from 'rxjs/operators/map';

@Injectable()
export class RestaurantService {
  zomatoEndPoint: string;
  
  constructor(
    private httpClient: HttpClient,
    private alertService:AlertService) {
    this.zomatoEndPoint = 'http://localhost:8081/api/v1/zomato';
  }

  getCollection(cityId: string  = "7"): Observable<Array<Collection>> {
     let urlSuffix =   `/collection/${cityId}`;
    let url = `${this.zomatoEndPoint}${urlSuffix}`;
    return this.httpClient.get(url).pipe(
      map(this.extractCollection),
      catchError(this.handleError<any>(`Retrieve ${cityId} collection`,[]))
    ); 
  }
  extractCollection(response: HttpResponse<String>) {
    let collArray: Collection[] = [];
    let collObjList = response["collections"];
    collObjList.forEach(element => {
      collArray.push(element["collection"]);
    });
    return collArray;
  }

  getListByCollection(collId: number): Observable<Array<Restaurant>> {
    let urlSuffix =   `/listByCollection/${collId}`;
   let url = `${this.zomatoEndPoint}${urlSuffix}`;
   return this.httpClient.get(url).pipe(
     map(this.extractListByCollection),
     catchError(this.handleError<any>(`Retrieve ${collId} listByCollection`,[]))
   ); 
 }

  

  extractListByCollection(response: HttpResponse<String>):Restaurant[] {
    let resArray: Restaurant[] = [];
    let resObjList = response["restaurants"];
    resObjList.forEach(element => {
      let resObj = element["restaurant"];
      resArray.push(resObj);
    });
    return resArray;
  }

  getRestaurantDetail(resId: string): Observable<Restaurant> {
    let urlSuffix =   `/restaurant/${resId}`;
   let url = `${this.zomatoEndPoint}${urlSuffix}`;
   return this.httpClient.get(url).pipe(
     catchError(this.handleError<any>(`Retrieve ${resId} Restaurant`,[]))
   ); 
 }

getLocationDetail(location: string): Observable<LocationEntity> {
  let urlSuffix =   `/locationSearch/${location}`;
 let url = `${this.zomatoEndPoint}${urlSuffix}`;
 return this.httpClient.get(url).pipe(
   map(this.mapLocationEntity),
   catchError(this.handleError<any>(`Retrieve ${location} Restaurant`,[]))
 ); 
}

mapLocationEntity(res: HttpResponse<String>):LocationEntity{
  let locEntityArray: LocationEntity[];
  locEntityArray = res["location_suggestions"];
  console.log(locEntityArray.length);
  console.log(locEntityArray);
  if(locEntityArray.length>0){
    return locEntityArray[0];
  }else{
    throw Error();
  }
}


getListBySearch(entityId: number, cuisine: string): Observable<Restaurant[]> {
  cuisine = cuisine.replace(" ","%20");
  let urlSuffix =   `/search/${entityId}/${cuisine}`;
  let url = `${this.zomatoEndPoint}${urlSuffix}`;
  return this.httpClient.get(url).pipe(
    map(this.extractListByCollection),
   catchError(this.handleError<any>(`Retrieve ${entityId} & ${cuisine} Restaurant`,[]))
 ); 
}

  /* transformPosterPath(movies): Array<Movie> {
    return movies.map(movie => {
      movie.poster_path = `${this.posterPathPrefix}${movie.poster_path}`;
      return movie;
    });
  }


  pickMovieResults(res: Response) {
    return res['results'];
  }

  //https://api.themoviedb.org/3/search/movie?api_key=fgfg&language=en-US&page=1&include_adult=false
  searchMovies(searchKey: string, page: string = '1'): Observable<Array<TmdbMovie>> {

    if (searchKey.length > 0) {
      let url = `https://api.themoviedb.org/3/search/movie?${this.movieDbApiKey}&${this.languageParam}&${this.pageParam}${page}&query=${searchKey}&include_adult=false`;
      return this.httpClient.get(url).pipe(
        retry(3),
        map(this.pickMovieResults),
        map(this.transformPosterPath.bind(this)),
        catchError(this.handleError<any>(`Search movies`,[]))
      );
    } else {
      return Observable.of([]);
    }
  }
  //https://api.themoviedb.org/3/movie/11216?api_key=82e157247804b2bf2707ca53349457d1&language=en-US
  getMovieDetail(id: number): Observable<Movie> {
    let url = `${this.tmdbEndPoint}/${id}?${this.movieDbApiKey}&${this.languageParam}`;
    return this.httpClient.get(url).pipe(
      map(this.transformPosterPathMovie.bind(this)),
      catchError(this.handleError<any>(`Retrieve movie detail`))
    );
  }

  transformPosterPathMovie(movie): Movie {
    movie.poster_path = `${this.posterPathPrefix}${movie.poster_path}`;
    return movie;
  };


  // spring api calls

  getAuthHeader() {
    return {
      headers: { "user-key": "" }
    }
  }

  getWatchListedMovies(): Observable<Array<Movie>> {
    if (this.authGuardService.canActivate) {
      return this.httpClient.get<Array<Movie>>(this.springApiEndpoint,
        this.getAuthHeader()
      ).pipe(
        catchError(this.handleSpringApiError<any>(`Retrieve watchlist movie`,[]))
      );
    }
  }
  saveWatchListMovies(movie) {
    if (this.authGuardService.canActivate) {
      movie.overview = (movie.overview).substring(0, 250) + "...";
      return this.httpClient.post(this.springApiEndpoint, movie,
        this.getAuthHeader()
      ).pipe(
        catchError(this.handleSpringApiError<any>(`save watchlist movie`,[]))
     
      );
    }
  }



  updateMovie(movie: Movie): Observable<Movie> {
    if (this.authGuardService.canActivate) {
      return this.httpClient.put<Movie>(`${this.springApiEndpoint}/${movie.id}`, movie,
        this.getAuthHeader()
      ).pipe(
        catchError(this.handleSpringApiError<any>(`update comment `,[]))
     
      );
    }
  }

  deleteMovie(movie: Movie) {
    if (this.authGuardService.canActivate) {
      return this.httpClient.delete(`${this.springApiEndpoint}/${movie.id}`,
        {
          headers: { "Authorization": "Bearer " + this.authService.getToken() },
          responseType: 'text'
        }
      ).pipe(
        catchError(this.handleSpringApiError<any>(`delete watchlist movie`,[]))
      );
    }
  }

  getMovie(id: number): Observable<Movie> {
    if (this.authGuardService.canActivate) {
      let obs = this.httpClient.get<Movie>(`${this.springApiEndpoint}/${id}`,
        this.getAuthHeader()
      );
      console.log(obs);
      return obs.pipe(
        tap(_ => console.log('movie got in service')),
        map(this.returnMovie.bind(this)),
        catchError(this.handleSpringApiError<any>(`Retrieve movie detail`,[]))
      );
    }
  }

  returnMovie(movie: Movie) {
    return movie;
  } */


   //Handle Error
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`${operation} failed => ${error.statusText}`);
      return Observable.of(result as T);
    }
  }

    //Handle Error
   private handleSpringApiError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`${operation} failed => ${error.error.message}`);
      return Observable.of(result as T);
    }
  }

}
