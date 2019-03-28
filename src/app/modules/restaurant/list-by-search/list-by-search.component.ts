import { AlertService } from './../../alert/alert.service';
import { RestaurantService } from './../restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { Router,ActivatedRoute } from '@angular/router/';
import { LocationEntity } from '../locationEntity';
import { AlertType } from '../../alert/alertType';

@Component({
  selector: 'res-list-by-search',
  templateUrl: './list-by-search.component.html',
  styleUrls: ['./list-by-search.component.css']
})
export class ListBySearchComponent implements OnInit {

  restaurants: Restaurant[];
  location: string;
  cuisine: string;
  locationEntity : LocationEntity;
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private actRoute : ActivatedRoute,
    private alertService : AlertService
  ) 
  {
    this.restaurants = [];

    this.actRoute.queryParams.subscribe(
      (params)=>{
         console.log(params);
         console.log(this.actRoute)
      this.location = params["location"];
      this.cuisine = params["cuisine"];
      console.log(this.location) + "|" + this.cuisine;
      }
    );
  }

  ngOnInit() {

  this.restaurantService.getLocationDetail(this.location).subscribe(
      (locationEntity)=>{
        console.log(locationEntity);
        this.locationEntity = locationEntity;
        if(this.locationEntity.entity_id){
        // get rest info
        this.restaurantService.getListBySearch(+this.locationEntity.entity_id,this.cuisine).subscribe(
          (restaurants)=>{
            console.log(restaurants);
            this.restaurants.push(...restaurants);
            console.log(this.restaurants);
          }
        );
      }else{
        this.alertService.alert(AlertType.Error,'location not found');
      }

      },(error)=>{
        this.alertService.alert(AlertType.Error,error.message);
      }
    )
  }

  viewDetail(restaurant):void{
    console.log('received emit');
    console.log(restaurant);
    this.router.navigate(['restaurants/detail',{id:restaurant.id}]);
  }

}
