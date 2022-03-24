package com.example.demo.apirest.service;


	

	import java.util.List;

import com.example.demo.apirest.entity.Region;

	

	public interface RegionService {

		public List<Region> findAll();
		
		public Region findById(Long id);
		
		public Region save(Region region);
		
		public void delete(Long id);
		
	

}
