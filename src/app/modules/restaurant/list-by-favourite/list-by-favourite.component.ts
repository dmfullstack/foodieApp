import { RestaurantLocalService } from './../restaurant-local.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'res-list-by-favourite',
  templateUrl: './list-by-favourite.component.html',
  styleUrls: ['./list-by-favourite.component.css']
})
export class ListByFavouriteComponent implements OnInit {
  restaurants: Restaurant[];
  collection_id: number;

  constructor(
    private restaurantService: RestaurantLocalService,
    private router: Router,
    private actRoute : ActivatedRoute
  ) 
  {
    this.restaurants = [];

    
  }

  ngOnInit() {

    this.restaurantService.getFavouriteRestaurants().subscribe(
      (restaurants)=>{
        this.restaurants.push(...restaurants);
        console.log(this.restaurants);
      }
    )
  }

  viewDetail(restaurant):void{
    console.log('received emit');
    console.log(restaurant);
    this.router.navigate(['restaurants/detail',{id:restaurant.fav_id,fromFavourite:true}]);
  }


}
