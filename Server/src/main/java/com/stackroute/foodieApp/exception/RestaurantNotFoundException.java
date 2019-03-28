package com.stackroute.foodieApp.exception;

public class RestaurantNotFoundException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 583522054754824858L;

	public RestaurantNotFoundException(String message, int restaurantId) {
		super(message);
		this.restaurantId = restaurantId;
		this.message = message;
	}
	
	private String message;
	private int restaurantId;
	
	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	@Override
	public String toString() {
		return "RestaurantNotFoundException [message=" + message + "] [restaurantId=" + restaurantId + "]";
	}
	
	


	
	
	

}
