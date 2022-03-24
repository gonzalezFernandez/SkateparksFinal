package com.example.demo.apirest.service;

import java.util.List;

import com.example.demo.apirest.entity.Skatepark;
import com.example.demo.apirest.entity.Region;

public interface SkateparkService {

	public List<Skatepark> findAll();
	
	public Skatepark findById(Long id);
	
	public Skatepark save(Skatepark skatepark);
	
	public void delete(Long id);
	
	
	public List<Region> findAllRegions();
		
	
	
}
