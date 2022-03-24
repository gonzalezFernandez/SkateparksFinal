package com.example.demo.apirest.entity;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="skateparks")
public class Skatepark {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)//generación clave primaria en MySQL
	private Long id;
	
	@Column(nullable=false)
	private String nombre;
	private String tipo;
	
	
	private String puntuacion;
	private String dificultad;
	private String empresa;
	@Column(name="created_at")
	@Temporal(TemporalType.DATE)
	private Date createdAt;
	private String imagen;
	
	@ManyToOne(fetch=FetchType.LAZY)//Tipo Relacion N:1
	@JoinColumn(name="region_id")//Nombre id en la base de datos para region id (es opcional)
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})//previene la serializacion para este campo
	private Region region;
	
	
	
	public Region getRegion() {
		return region;
	}


	public void setRegion(Region region) {
		this.region = region;
	}


	public String getImagen() {
		return imagen;
	}


	public void setImagen(String imagen) {
		this.imagen = imagen;
	}


	//para crear un skatepark con fecha del sistema
	@PrePersist
	public void prePersist() {
		if(createdAt==null) {
			createdAt=new Date();
		 }
		}
		
	
	
	public String getTipo() {
		return tipo;
	}


	public void setTipo(String tipo) {
		this.tipo = tipo;
	}


	public String getPuntuacion() {
		return puntuacion;
	}


	public void setPuntuacion(String puntuacion) {
		this.puntuacion = puntuacion;
	}


	public String getDificultad() {
		return dificultad;
	}


	public void setDificultad(String dificultad) {
		this.dificultad = dificultad;
	}


	public String getEmpresa() {
		return empresa;
	}


	public void setEmpresa(String empresa) {
		this.empresa = empresa;
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	
}
