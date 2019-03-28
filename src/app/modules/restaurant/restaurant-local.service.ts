import { tap } from 'rxjs/operators/tap';
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
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class RestaurantLocalService {
  springApiEndpoint: string;
  
  constructor(
    private httpClient: HttpClient,
    private alertService:AlertService,
    private authService: AuthenticationService) {
    this.springApiEndpoint = 'http://localhost:8081/api/v1/restaurants';
  }

  // spring api calls

  getAuthHeader() {
    return {
      headers: { "Authorization": "Bearer " + this.authService.getToken() }
    }
  }

   //Handle Error
   private handleSpringApiError<T>(operation = 'operation', result?: T,showAlert = true) {
    return (error: any): Observable<T> => {
      if(showAlert){
        this.alertService.error(`${operation} failed => ${error.error.message}`);
      }
      return Observable.of(result as T);
    }
  }

  getFavouriteRestaurants(): Observable<Array<Restaurant>> {
    return this.httpClient.get(
      this.springApiEndpoint,
      this.getAuthHeader()
    ).pipe(
      catchError(this.handleSpringApiError<any>(`Retrieve favourite restaurant`,[])),
    );
  }

  saveFavouriteRestaurant(restaurant) {

    // save additional variables
    restaurant.address = `${restaurant.location.address}, ${restaurant.location.city},${restaurant.location.zipcode}`;
    restaurant.city = restaurant.location.city;

      return this.httpClient.post(
        this.springApiEndpoint, 
        restaurant,
        this.getAuthHeader()
      ).pipe(
        catchError(this.handleSpringApiError<any>(`save favourite restaurant`,[]))
     
      );
  }



  updateRestaurant(restaurant: Restaurant, reviewText: string): Observable<Restaurant> {
      let errRestaurant = restaurant;
      restaurant.review = reviewText;
      return this.httpClient.put<Restaurant>(
        `${this.springApiEndpoint}/${restaurant.fav_id}`, 
        restaurant,
        this.getAuthHeader()
      ).pipe(
        catchError(this.handleSpringApiError<any>(`update review `,errRestaurant))
      );
  }

  deleteRestaurant(restaurant: Restaurant) {
      return this.httpClient.delete(
        `${this.springApiEndpoint}/${restaurant.fav_id}`,
        {
          headers: { "Authorization": "Bearer " + this.authService.getToken() },
          responseType: 'text'
        }
      ).pipe(
        catchError(this.handleSpringApiError<any>(`delete watchlist movie`,restaurant))
      );
    }
  

  getRestaurantByFavId(id: number): Observable<Restaurant> {
      let obs = this.httpClient.get<Restaurant>(`${this.springApiEndpoint}/${id}`,
        this.getAuthHeader()
      );
      console.log(obs);
      return obs.pipe(
        tap(_ => console.log('Restaurant got in service')),
        catchError(this.handleSpringApiError<any>(`Retrieve Restaurant detail`,[]))
      );
    }
  


  getRestaurantById(id: number): Observable<Restaurant> {
    let obs = this.httpClient.get<Restaurant>(`${this.springApiEndpoint}/byId/${id}`,
      this.getAuthHeader()
    );
    console.log(obs);
    return obs.pipe(
       tap(_ => console.log('Restaurant got in service')),
      catchError(this.handleSpringApiError<any>(`Retrieve Restaurant detail`,[], false)) 
      
    );
  }
}

  