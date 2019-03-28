import { Router } from '@angular/router';
import { Collection } from './../collection';
import { RestaurantService } from './../restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'res-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  collections:Collection[];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) 
  {
    this.collections = [];
  }

  ngOnInit() {

    this.restaurantService.getCollection().subscribe(
      (collections)=>{
        this.collections.push(...collections);
      }
    )
  }


  searchRestaurant(collection : Collection):void{
    this.router.navigate(['/restaurants/listByCollection',{coll_id:collection.collection_id}])
  }

}
