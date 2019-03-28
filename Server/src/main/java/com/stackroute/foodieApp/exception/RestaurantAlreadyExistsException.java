package com.stackroute.foodieApp.exception;

public class RestaurantAlreadyExistsException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 483522054754824858L;

	public RestaurantAlreadyExistsException(String message, String restaurantName) {
		super(message);
		this.restaurantName = restaurantName;
		this.message = message;
		
	}
	
	private String message;
	private String restaurantName;
	
	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	@Override
	public String toString() {
		return "RestaurantAlreadyExistsException [message=" + message + "] [restaurant=" + restaurantName + "]";
	}
	
	


	
	
	

}
