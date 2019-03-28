package com.stackroute.foodieApp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.foodieApp.domain.User;
import com.stackroute.foodieApp.exception.UserAlreadyExistsException;
import com.stackroute.foodieApp.exception.UserNotFoundException;
import com.stackroute.foodieApp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	
	private UserRepository userRepo;
	
	@Autowired
	public UserServiceImpl(UserRepository userRepo) {
		super();
		this.userRepo = userRepo;
	}

	@Override
	public boolean saveUser(User user) throws UserAlreadyExistsException {
		Optional<User> userFound = this.userRepo.findById(user.getUserId());
		if(userFound.isPresent()){
			throw new UserAlreadyExistsException("User already exists", user.getUserId());
		}
		this.userRepo.save(user);
		return true;
	}

	@Override
	public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {
		
		
		Optional<User> userFound = this.userRepo.findById(userId);
		if(!userFound.isPresent()){
			throw new UserNotFoundException("User not found", userId);
		}
		
		return this.userRepo.findByUserIdAndPassword(userId, password);
	}
		
		
	

}
