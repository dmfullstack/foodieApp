import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ListByCollectionComponent } from './list-by-collection/list-by-collection.component';
import { ListByFavouriteComponent } from './list-by-favourite/list-by-favourite.component';
import { ListBySearchComponent } from './list-by-search/list-by-search.component';

const routes: Routes = [
  {
    path: 'restaurants',
    children: [
        { path: '', redirectTo: '/restaurants/collection', pathMatch: 'full' },
        { path: 'collection', component: CollectionComponent},
        { path: 'listBySearch', component: ListBySearchComponent},
        { path: 'listByCollection', component: ListByCollectionComponent},
        { path: 'listByFavourite', component: ListByFavouriteComponent},
        { path: 'detail', component: DetailComponent},
        
       
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
