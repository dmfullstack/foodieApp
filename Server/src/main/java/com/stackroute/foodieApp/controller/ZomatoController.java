package com.stackroute.foodieApp.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping(path = "api/v1/zomato")
public class ZomatoController {

	private final static String ZOMATO_END_POINT = "https://developers.zomato.com/api/v2.1/";
	private static JacksonJsonParser jacksonJsonParser = new JacksonJsonParser();
	
	@GetMapping("/collection/{city_id}")
	public ResponseEntity<?> getCollection(@PathVariable("city_id") final String cityId) {
		ResponseEntity<String> response = null;
		URI uri;
		try {
			RestTemplate restTemplate = new RestTemplate();
			uri = new URI( ZOMATO_END_POINT+ "collections" + "?city_id=" + cityId);
			response = restTemplate.exchange(uri,HttpMethod.GET,getHeaderEntity(), String.class);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return response;
	}
	
	@GetMapping("/listByCollection/{coll_id}")
	public ResponseEntity<?> getListByCollection(@PathVariable("coll_id") final String collId) {
		ResponseEntity<String> response = null;
		URI uri;
		try {
			RestTemplate restTemplate = new RestTemplate();
			uri = new URI( ZOMATO_END_POINT+ "search" + "?collection_id=" + collId);
			response = restTemplate.exchange(uri,HttpMethod.GET,getHeaderEntity(), String.class);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return response;
	}
	
	@GetMapping("/restaurant/{res_id}")
	public ResponseEntity<?> getRestaurantDetail(@PathVariable("res_id") final String resId) {
		ResponseEntity<String> response = null;
		URI uri;
		try {
			RestTemplate restTemplate = new RestTemplate();
			uri = new URI( ZOMATO_END_POINT+ "restaurant" + "?res_id=" + resId);
			response = restTemplate.exchange(uri,HttpMethod.GET,getHeaderEntity(), String.class);
			Map<String, Object> map = jacksonJsonParser.parseMap(response.getBody());
			System.out.println(map);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return response;
	}
	
	@GetMapping("/locationSearch/{query}")
	public ResponseEntity<?> findLocation(@PathVariable("query") final String query) {
		ResponseEntity<String> response = null;
		URI uri;
		try {
			RestTemplate restTemplate = new RestTemplate();
			uri = new URI( ZOMATO_END_POINT+ "locations" + "?query=" + query);
			response = restTemplate.exchange(uri,HttpMethod.GET,getHeaderEntity(), String.class);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return response;
	}
	
	@GetMapping("/search/{entity_id}/{cuisine}")
	public ResponseEntity<?> findLocation(@PathVariable("entity_id") final String entity_id,
			@PathVariable("cuisine") final String cuisine) {
		ResponseEntity<String> response = null;
		URI uri;
		try {
			RestTemplate restTemplate = new RestTemplate();
			uri = new URI( ZOMATO_END_POINT+ "search" + "?entity_id=" + entity_id+"&"+"cuisines="+cuisine+"&entity_type=city");
			response = restTemplate.exchange(uri,HttpMethod.GET,getHeaderEntity(), String.class);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return response;
	}

	private HttpEntity getHeaderEntity() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("user-key", "30a6952f27c864a0e74ce250034655fd");
		HttpEntity httpEntity = new HttpEntity<>(headers);
		return httpEntity;
	}
}


