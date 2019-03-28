package com.stackroute.foodieApp.domain;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "restaurant")
public class Restaurant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fav_id")
	@JsonProperty("fav_id")
	private int favId;
	
	@Column(name = "restaurant_id")
	@JsonProperty("id")
	private String restaurantId;
	@Column(name = "name")
	@JsonProperty("name")
	private String name;
	@Column(name = "url")
	@JsonProperty("url")
	private String url;
	@Column(name = "featured_image")
	@JsonProperty("featured_image")
	private String featuredImage;
	
	@Column(name = "address")
	@JsonProperty("address")
	private String address;
	
	@Column(name = "average_cost_for_two")
	@JsonProperty("average_cost_for_two")
	private String averageCostForTwo;
	
	@Column(name = "currency")
	@JsonProperty("currency")
	private String currency;
	
	@Column(name = "cuisines")
	@JsonProperty("cuisines")
	private String cuisines;
	
	@Column(name = "city")
	@JsonProperty("city")
	private String city;
	
	@Column(name = "review")
	@JsonProperty("review")
	private String review;
	
	@Column(name="user_id")
	@JsonProperty("user_id")
	private String userId;


	
	
	


	




	public Restaurant(int favId, String restaurantId, String name, String url, String featuredImage, String address,
			String averageCostForTwo, String currency, String cuisines, String city, String review, String userId) {
		super();
		this.favId = favId;
		this.restaurantId = restaurantId;
		this.name = name;
		this.url = url;
		this.featuredImage = featuredImage;
		this.address = address;
		this.averageCostForTwo = averageCostForTwo;
		this.currency = currency;
		this.cuisines = cuisines;
		this.city = city;
		this.review = review;
		this.userId = userId;
	}




	public String getReview() {
		return review;
	}




	public void setReview(String review) {
		this.review = review;
	}




	public String getAddress() {
		return address;
	}




	public void setAddress(String address) {
		this.address = address;
	}




	public String getAverageCostForTwo() {
		return averageCostForTwo;
	}




	public void setAverageCostForTwo(String averageCostForTwo) {
		this.averageCostForTwo = averageCostForTwo;
	}




	public String getCurrency() {
		return currency;
	}




	public void setCurrency(String currency) {
		this.currency = currency;
	}




	public String getCuisines() {
		return cuisines;
	}




	public void setCuisines(String cuisines) {
		this.cuisines = cuisines;
	}




	public String getCity() {
		return city;
	}




	public void setCity(String city) {
		this.city = city;
	}




	public Restaurant() {
		super();
		// TODO Auto-generated constructor stub
	}




	public int getFavId() {
		return favId;
	}


	public void setFavId(int favId) {
		this.favId = favId;
	}


	public String getRestaurantId() {
		return restaurantId;
	}


	public void setRestaurantId(String restaurantId) {
		this.restaurantId = restaurantId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getUrl() {
		return url;
	}


	public void setUrl(String url) {
		this.url = url;
	}


	public String getFeaturedImage() {
		return featuredImage;
	}


	public void setFeaturedImage(String featuredImage) {
		this.featuredImage = featuredImage;
	}


	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	
	
}
