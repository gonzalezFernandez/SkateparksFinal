package com.example.demo.apirest.dao;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import com.example.demo.apirest.entity.Region;


@Repository
public interface RegionDao extends CrudRepository<Region,Long>{

}
