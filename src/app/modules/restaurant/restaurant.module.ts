import { RestaurantLocalService } from './restaurant-local.service';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection/collection.component';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ListByCollectionComponent } from './list-by-collection/list-by-collection.component';
import { ListByFavouriteComponent } from './list-by-favourite/list-by-favourite.component';
import { ListBySearchComponent } from './list-by-search/list-by-search.component';
import { RestaurantService } from './restaurant.service';

@NgModule({
  imports: [
    CommonModule,
    RestaurantRoutingModule
  ],
  declarations: [CollectionComponent, SearchHeaderComponent, ListComponent, DetailComponent, ListByCollectionComponent, ListByFavouriteComponent, ListBySearchComponent],
  providers:[RestaurantLocalService , RestaurantService]
})
export class RestaurantModule { }
