package com.stackroute.foodieApp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.foodieApp.domain.Restaurant;



@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
	
	public List<Restaurant> findByUserId(String userId);
	public Optional<Restaurant> findByUserIdAndRestaurantId(String userId, String restaurantId);
	public Optional<Restaurant> findByFavId(int favId);
	public void deleteByFavId(int favId);

}
