package com.stackroute.foodieApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.foodieApp.domain.Restaurant;
import com.stackroute.foodieApp.exception.RestaurantAlreadyExistsException;
import com.stackroute.foodieApp.exception.RestaurantNotFoundException;
import com.stackroute.foodieApp.repository.RestaurantRepository;

@Service
public class RestaurantServiceImpl implements RestaurantService{


	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@Override
	public boolean saveRestaurant(Restaurant restaurant) throws RestaurantAlreadyExistsException {
		Optional<Restaurant> updRestaurant = restaurantRepository.findByUserIdAndRestaurantId(restaurant.getUserId() ,restaurant.getRestaurantId());
		if(updRestaurant.isPresent()){
			throw new RestaurantAlreadyExistsException("restaurant already available", restaurant.getName());
		}
		restaurantRepository.save(restaurant);
		return true;
	}

	@Override
	public Restaurant updateRestaurant(Restaurant restaurant) throws RestaurantNotFoundException {
		Optional<Restaurant> updRestaurant = restaurantRepository.findByFavId(restaurant.getFavId());
		if(!updRestaurant.isPresent()){
			throw new RestaurantNotFoundException("restaurant not found", restaurant.getFavId());
		}
		return restaurantRepository.save(restaurant);
	}

	@Override
	public Restaurant retrieveRestaurantById(int favId) throws RestaurantNotFoundException {
		Optional<Restaurant> restaurant = restaurantRepository.findByFavId(favId);
		if(!restaurant.isPresent()){
			throw new RestaurantNotFoundException("restaurant not found", favId);
		}
		return restaurant.get();
	}
	
	@Override
	public Restaurant retrieveRestaurantByResIdAndUser(String resId, String userId) throws RestaurantNotFoundException {
		Optional<Restaurant> restaurant = restaurantRepository.findByUserIdAndRestaurantId(userId, resId);
		if(!restaurant.isPresent()){
			throw new RestaurantNotFoundException("restaurant not found", 0);
		}
		return restaurant.get();
	}
	
	

	@Override
	public boolean deleteById(int id) throws RestaurantNotFoundException {
		Optional<Restaurant> restaurant = restaurantRepository.findByFavId(id);
		if(!restaurant.isPresent()){
			throw new RestaurantNotFoundException("restaurant not found", id);
		}
		restaurantRepository.deleteById(id);
		return true;
	}

	

	@Override
	public List<Restaurant> retrieveMyRestaurants(String userId) throws Exception {
		return restaurantRepository.findByUserId(userId);
	}

}

