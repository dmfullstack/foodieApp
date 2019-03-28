package com.stackroute.foodieApp.service;


import com.stackroute.foodieApp.domain.User;
import com.stackroute.foodieApp.exception.UserAlreadyExistsException;
import com.stackroute.foodieApp.exception.UserCredentialsValidationException;
import com.stackroute.foodieApp.exception.UserNotFoundException;

public interface UserService {
	
	public boolean saveUser(User user) throws UserAlreadyExistsException;
	public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException;

}
