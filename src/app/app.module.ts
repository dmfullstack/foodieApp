import { AuthenticationModule } from './modules/authentication/authentication.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AlertModule } from './modules/alert/alert.module';


export const myComponents = [
  AppComponent
];




@NgModule({
  declarations: [
    ...myComponents
  ],
  imports: [
    BrowserModule,
    CoreModule,
       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
