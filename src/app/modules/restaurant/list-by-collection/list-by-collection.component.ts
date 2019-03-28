import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'res-list-by-collection',
  templateUrl: './list-by-collection.component.html',
  styleUrls: ['./list-by-collection.component.css']
})
export class ListByCollectionComponent implements OnInit {

  restaurants: Restaurant[];
  collection_id: number;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private actRoute : ActivatedRoute
  ) 
  {
    this.restaurants = [];

    this.actRoute.params.subscribe(
      (params)=>{
      this.collection_id = +params["coll_id"];
      console.log(this.collection_id);
      }
    );
  }

  ngOnInit() {

    this.restaurantService.getListByCollection(this.collection_id).subscribe(
      (restaurants)=>{
        console.log(restaurants);
        this.restaurants.push(...restaurants);
        console.log(this.restaurants);
      }
    )
  }

  viewDetail(restaurant):void{
    console.log('received emit');
    console.log(restaurant);
    this.router.navigate(['restaurants/detail',{id:restaurant.id}]);
  }


  /* searchRestaurant(collection : Collection):void{
    this.router.navigate(['/restaurants/listByCollection'])
  } */

}
