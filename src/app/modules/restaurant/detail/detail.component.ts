import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from './../restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { Location } from '@angular/common';
import { AlertService } from '../../alert/alert.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { RestaurantLocalService } from '../restaurant-local.service';
import { AlertType } from '../../alert/alertType';

@Component({
  selector: 'res-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  

  restaurant: Restaurant;
  res_id : string;
  showAdd : boolean;
  showRemove: boolean;
  fromFavourite : boolean;
  showAddReviewSection : boolean;

  constructor(
    private restaurantService: RestaurantService,
    private resLocalService: RestaurantLocalService,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private router: Router,
    private actRoute : ActivatedRoute,
    private location: Location
  ) 
  {
    this.restaurant = <Restaurant>{}
    this.showAdd = false;
    this.showRemove = false;
    this.showAddReviewSection = false;
    this.actRoute.params.subscribe(
      (params)=>{
      this.res_id = params["id"];
      this.fromFavourite = params["fromFavourite"]==='true';
      console.log(this.res_id);
      console.log(this.fromFavourite);
      }
    );
  }

  ngOnInit() {

    if(this.fromFavourite){
      this.getRestaurantFromLocalRepo();
    }else{ // from collection and search
      if(this.authService.isLoggedIn()){ 
        this.findRestaurantInLocalElseZomato();
      }else{
        this.getRestaurant();
    }
    
  }
}

  goBack(){
    this.location.back();
  }

  getRestaurantFromLocalRepo(): void {
    console.log("res not in local repo, start search in zomato");
    this.resLocalService.getRestaurantByFavId(+this.res_id) // fav_id passed
    .subscribe(
      (res)=>{
        this.restaurant = res;
        this.showAdd = false;
        this.showRemove = true;
        this.showAddReviewSection = true;
        console.log(this.restaurant);
      }
    );
  }

  findRestaurantInLocalElseZomato():void{
    this.resLocalService.getRestaurantById(+this.res_id) // res id an user passed to check if available
    .subscribe(
      (res)=>{
        this.restaurant = res;
        this.showAdd = false;
        this.showRemove = true;
        this.showAddReviewSection = true;
        console.log(this.restaurant);
        if(!this.restaurant.fav_id){
          this.getRestaurant();
        }
      }      
    );
  }

  getRestaurant():void{
    this.restaurantService.getRestaurantDetail(this.res_id)
      .subscribe(
        (res)=>{
          this.restaurant = res;
          this.showAdd = true;
          this.showRemove = false;
          this.showAddReviewSection = false;
          console.log(this.restaurant);
        }
      );
  }

  addToFavourites():void{
      this.resLocalService.saveFavouriteRestaurant(this.restaurant).
      subscribe(
        (res)=>{
          this.restaurant = res;
          this.alertService.alert(AlertType.Success,`REstaurant ${res.name} added to your favourites`)
          this.showAdd = false;
          this.showRemove = true;
          this.showAddReviewSection = true;
        }
      );
  }

  deleteFromFavourites():void{
    this.resLocalService.deleteRestaurant(this.restaurant).
    subscribe(
      (res)=>{
        
        this.alertService.alert(AlertType.Success,`REstaurant ${res.name} deleted from your favourites`)
        this.showAdd = true;
        this.showRemove = false;
        this.showAddReviewSection = false;
      }
    );
  }


  addReview(reviewText):void{
    
    this.resLocalService.updateRestaurant(this.restaurant, reviewText).
      subscribe(
        (res)=>{
          this.alertService.alert(AlertType.Success,`Review added !!`)
          this.showAdd = false;
          this.showRemove = true;
          this.showAddReviewSection = true;
          this.restaurant = res;
        }

      );
  }

}
