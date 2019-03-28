package com.stackroute.foodieApp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.stackroute.foodieApp.filter.JwtFilter;
@SpringBootApplication
public class FoodieApp {

	
	@Bean
	public FilterRegistrationBean getJwtFilter(){
		FilterRegistrationBean bean = new FilterRegistrationBean();
		bean.setFilter(new JwtFilter());
		bean.addUrlPatterns("/api/v1/restaurants/*");
		return bean;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(FoodieApp.class, args);
	}
}
