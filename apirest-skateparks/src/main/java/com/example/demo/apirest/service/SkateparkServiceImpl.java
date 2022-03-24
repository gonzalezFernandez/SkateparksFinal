package com.example.demo.apirest.service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.apirest.dao.SkateparkDao;
import com.example.demo.apirest.entity.Skatepark;
import com.example.demo.apirest.entity.Region;

@Service
public class SkateparkServiceImpl implements SkateparkService{

	@Autowired
	private SkateparkDao skateparkDao;
	@Override
	@Transactional(readOnly=true)//mejor rendimiento consultas
	public List<Skatepark> findAll() {
		
		return (List<Skatepark>) skateparkDao.findAll();
	}
	@Override
	@Transactional(readOnly=true)
	public Skatepark findById(Long id) {
		
		return skateparkDao.findById(id).orElse(null);
	}
	
	@Override
	@Transactional//como va por post no es readOnly
	public Skatepark save(Skatepark skatepark) {
		
		return skateparkDao.save(skatepark);
	}
	
	@Override
	@Transactional
	public void delete(Long id) {
		
		skateparkDao.deleteById(id);
	}
	
	@Override
	@Transactional(readOnly=true)
	public List<Region> findAllRegions() {
		return skateparkDao.findAllRegions();
		
	}
	
	

}
