import { AlertModule } from './../modules/alert/alert.module';
import { RestaurantModule } from './../modules/restaurant/restaurant.module';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/restaurants/collection' },

];
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RestaurantModule,
    AuthenticationModule,
    AlertModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [HeaderComponent],
  exports:[HeaderComponent,
    RestaurantModule,
    AuthenticationModule,
    AlertModule,
    RouterModule
  ]
})
export class CoreModule { }
