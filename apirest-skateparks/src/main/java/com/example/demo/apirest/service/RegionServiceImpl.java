package com.example.demo.apirest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.example.demo.apirest.dao.RegionDao;

import com.example.demo.apirest.entity.Region;
@Service
public class RegionServiceImpl implements RegionService{

	@Autowired
	private RegionDao regionDao;
	
	@Transactional(readOnly=true)
	@Override
	public List<Region> findAll() {
		
		return (List<Region>) regionDao.findAll();
	}

	@Override
	public Region findById(Long id) {
		return regionDao.findById(id).orElse(null);
		
	}

	@Override
	public Region save(Region region) {
		return regionDao.save(region);
		
	}

	@Override
	public void delete(Long id) {
		regionDao.deleteById(id);
		
	}

}
