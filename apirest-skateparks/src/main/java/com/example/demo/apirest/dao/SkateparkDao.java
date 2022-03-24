package com.example.demo.apirest.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.apirest.entity.Skatepark;
import com.example.demo.apirest.entity.Region;
@Repository
public interface SkateparkDao extends CrudRepository<Skatepark,Long>{

	@Query("from Region")//para que lo busque en la tabla region
	public List<Region> findAllRegions();
}
