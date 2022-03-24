package com.example.demo.apirest.service;




import java.util.List;
import java.util.stream.Collectors;


import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.apirest.dao.UsuarioDao;
import com.example.demo.apirest.entity.Usuario;

@Service
public class UsuarioService implements UserDetailsService{
	
	private Logger logger = Logger.getLogger(UsuarioService.class);
	
	@Autowired
	private UsuarioDao usuarioDao;
	

	@Override
	@Transactional(readOnly=true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioDao.findByUsername(username);
		
		if(usuario==null) {
			logger.error("Error en el login: no existe el usuario"+ username+ "en el sistema");
			throw new UsernameNotFoundException("Error en el login: no existe el usuario"+ username+ "en el sistema");
		}
		
		List<GrantedAuthority> authorities = usuario.getRoles()
				.stream()
				.map(role -> new SimpleGrantedAuthority(role.getNombre()))
				.peek(authority->logger.info("Role: "+authority.getAuthority()))
				.collect(Collectors.toList());
				
				
		return new User(usuario.getUsername(), usuario.getPassword(), usuario.getEnabled(), true, true, true, authorities);		
	}
	
}
