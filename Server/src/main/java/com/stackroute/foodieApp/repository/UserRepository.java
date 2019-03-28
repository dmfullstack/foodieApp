package com.stackroute.foodieApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stackroute.foodieApp.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{

	@Query("select user from User user where userId=(?1) and password=(?2)")
	User validate(String userId, String password);
	
	User findByUserIdAndPassword(String userId, String password);
}
