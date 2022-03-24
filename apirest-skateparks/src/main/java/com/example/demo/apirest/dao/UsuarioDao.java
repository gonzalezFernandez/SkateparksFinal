package com.example.demo.apirest.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.apirest.entity.Usuario;

@Repository
public interface UsuarioDao extends CrudRepository<Usuario,Long>{



public Usuario findByUsername(String username);

/*tambien se puede hacer así
* @Query("select u from Usuario u where u.username=?1")
* public Usuario findByUsername(String username);
*/


}
