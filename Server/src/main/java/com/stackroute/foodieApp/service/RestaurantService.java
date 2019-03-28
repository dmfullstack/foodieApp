package com.stackroute.foodieApp.service;

import java.util.List;

import com.stackroute.foodieApp.domain.Restaurant;
import com.stackroute.foodieApp.exception.RestaurantAlreadyExistsException;
import com.stackroute.foodieApp.exception.RestaurantNotFoundException;

public interface RestaurantService {
	boolean saveRestaurant(Restaurant Restaurant) throws RestaurantAlreadyExistsException;
	Restaurant updateRestaurant(Restaurant Restaurant) throws RestaurantNotFoundException;
	Restaurant retrieveRestaurantById(int id) throws RestaurantNotFoundException;
	boolean deleteById(int id) throws RestaurantNotFoundException;
	List<Restaurant> retrieveMyRestaurants(String userId) throws Exception;
	Restaurant retrieveRestaurantByResIdAndUser(String resId,String userId) throws RestaurantNotFoundException;
	
}
