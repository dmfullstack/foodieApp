package com.stackroute.foodieApp.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.foodieApp.domain.Restaurant;
import com.stackroute.foodieApp.exception.RestaurantAlreadyExistsException;
import com.stackroute.foodieApp.exception.RestaurantNotFoundException;
import com.stackroute.foodieApp.service.RestaurantService;

import io.jsonwebtoken.Claims;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/restaurants")
public class RestaurantController {
	
	
	private RestaurantService restaurantService;

	@Autowired
	public RestaurantController(final RestaurantService restaurantService) {
		this.restaurantService = restaurantService;
	}

	@PostMapping
	public ResponseEntity<?> saveNewRestaurant(@RequestBody final Restaurant restaurant,
			HttpServletRequest req, HttpServletResponse res) {
		
		Claims claims = (Claims) req.getAttribute("claims");
		String userId = claims.getSubject();
		System.out.println("User Id : " + userId);
		ResponseEntity<?> response;
		System.out.println("Restaurant : " + restaurant);
		try {
			restaurant.setUserId(userId);
			restaurantService.saveRestaurant(restaurant);
			response = new ResponseEntity<Restaurant>(restaurant, HttpStatus.CREATED);
		} catch (RestaurantAlreadyExistsException exception) {
			System.out.println(exception.getMessage());
			System.out.println("{ \"message\" : \""+exception.getMessage()+"\"}");
			response = new ResponseEntity<String>("{ \"message\" : \""+exception.getMessage()+"\"}",
					HttpStatus.CONFLICT);
		}
		return response;
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateRestaurant(@PathVariable("id") final Integer id, @RequestBody final Restaurant restaurant) {
		ResponseEntity<?> response;
		try {
			
			Restaurant updRestaurant = restaurantService.updateRestaurant(restaurant);
			response = new ResponseEntity<Restaurant>(updRestaurant, HttpStatus.OK);
		} catch (RestaurantNotFoundException exception) {
			response = new ResponseEntity<String>("{ \"message\" : \"" + exception.getMessage() + "\"}",
					HttpStatus.CONFLICT);
		}
		return response;
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getRestaurant(@PathVariable("id") final Integer id) {
		ResponseEntity<?> response;
		try {
			Restaurant restaurant = restaurantService.retrieveRestaurantById(id);
			response = new ResponseEntity<Restaurant>(restaurant, HttpStatus.OK);
		} catch (RestaurantNotFoundException exception) {
			response = new ResponseEntity<String>("{ \"message\" : \"" + exception.getMessage() + "\"}",
					HttpStatus.NOT_FOUND);
		}
		return response;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteRestaurant(@PathVariable("id") final Integer id) {
		ResponseEntity<?> response;
		try {
			if (restaurantService.deleteById(id)) {
				response = new ResponseEntity<String>("restaurant deleted successfully", HttpStatus.OK);
			} else {
				response = new ResponseEntity<String>("Server issue in deleteing restaurant",
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (RestaurantNotFoundException exception) {
			response = new ResponseEntity<String>("{ \"message\" : \"" + exception.getMessage() + "\"}",
					HttpStatus.NOT_FOUND);
		}
		return response;
	}

	@GetMapping()
	public ResponseEntity<?> getMyRestaurants(
			HttpServletRequest req, HttpServletResponse res) {
		ResponseEntity<?> response;
		Claims claims = (Claims) req.getAttribute("claims");
		String userId = claims.getSubject();
		System.out.println("User Id : " + userId);
		
		try {
			List<Restaurant>  restaurantList = restaurantService.retrieveMyRestaurants(userId);
			response = new ResponseEntity<List<Restaurant>>(restaurantList, HttpStatus.OK);
		} catch (Exception exception) {
			System.out.println(exception.getMessage());
			response = new ResponseEntity<String>("Server issue in fetching restaurant",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	
	@GetMapping("/byId/{id}")
	public ResponseEntity<?> getRestaurantById(@PathVariable("id") final String resId,HttpServletRequest req, HttpServletResponse res) {
		ResponseEntity<?> response;
		Claims claims = (Claims) req.getAttribute("claims");
		String userId = claims.getSubject();
		System.out.println("User Id : " + userId);
		try {
			Restaurant restaurant = restaurantService.retrieveRestaurantByResIdAndUser(resId,userId);
			response = new ResponseEntity<Restaurant>(restaurant, HttpStatus.OK);
		} catch (RestaurantNotFoundException exception) {
			response = new ResponseEntity<String>("{ \"message\" : \"" + exception.getMessage() + "\"}",
					HttpStatus.NOT_FOUND);
		}
		return response;
	}
	

}
