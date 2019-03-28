package com.stackroute.foodieApp.service;

import java.util.Map;

import com.stackroute.foodieApp.domain.User;

public interface SecurityTokenGenerator {

	public Map<String, String> generateToken(User user);
}
