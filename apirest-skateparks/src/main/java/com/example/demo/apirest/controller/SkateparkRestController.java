package com.example.demo.apirest.controller;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.apirest.entity.Skatepark;
import com.example.demo.apirest.entity.Region;
import com.example.demo.apirest.service.SkateparkService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class SkateparkRestController {

	@Autowired
	private SkateparkService servicio;
	
	@GetMapping({"/skateparks","/todos"})
	public List<Skatepark> index(){
		return servicio.findAll();
	}
	
	/*@GetMapping("/skateparks/{id}")
	public Skatepark findSkateparkById(@PathVariable Long id) {
		return servicio.findById(id);
	}*/
	
	@GetMapping("/skateparks/{id}")
	public ResponseEntity<?>  findSkateparkById(@PathVariable Long id) {
		Skatepark skatepark = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			
			skatepark = servicio.findById(id);
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar consulta a base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		
		if(skatepark == null) {
			response.put("mensaje", "El skatepark ID: " +id.toString()+" no existe en la base de datos");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Skatepark>(skatepark,HttpStatus.OK);
		
	}
	
	/*@PostMapping("/skatepark")
	@ResponseStatus(HttpStatus.CREATED)
	public Skatepark saveSkatepark(@RequestBody Skatepark skatepark) {
		return servicio.save(skatepark);
	}*/
	
	@PostMapping("/skatepark")
	public ResponseEntity<?> saveSkatepark(@RequestBody Skatepark skatepark) {
		 Skatepark skateparkNew= null;
		 Map<String, Object> response = new HashMap<>();
		 
		 try {
			
			 skateparkNew = servicio.save(skatepark);
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar un insert a base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		 
		 response.put("mensaje", "El skatepark ha sido creado con éxito!");
		 response.put("skatepark",skateparkNew);
		 
		 return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
		 
		 
	}
	
	
	
	
	/*@PutMapping("/skatepark/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Skatepark updateSkatepark(@RequestBody Skatepark skatepark, @PathVariable Long id) {
		Skatepark skateparkUpdate = servicio.findById(id);
		
		skateparkUpdate.setNombre(skatepark.getNombre());
		skateparkUpdate.setApellido(skatepark.getApellido());
		skateparkUpdate.setEmail(skatepark.getEmail());
		skateparkUpdate.setTelefono(skatepark.getTelefono());
		skateparkUpdate.setCreatedAt(skatepark.getCreatedAt());
		
		return servicio.save(skateparkUpdate);
		
		
	}*/
	
	@PutMapping("/skatepark/{id}")
	public ResponseEntity<?> updateSkatepark(@RequestBody Skatepark skatepark, @PathVariable Long id) {
		Skatepark skateparkActual = servicio.findById(id);
		
		Map<String, Object> response = new HashMap<>();
		
		if(skateparkActual == null) {
			response.put("mensaje","Error: no se pudo editar, el skatepark con ID: "+id.toString()+" no existe en la base de datos");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			skateparkActual.setNombre(skatepark.getNombre());
			skateparkActual.setTipo(skatepark.getTipo());
			skateparkActual.setPuntuacion(skatepark.getPuntuacion());
			skateparkActual.setDificultad(skatepark.getDificultad());
			skateparkActual.setCreatedAt(skatepark.getCreatedAt());
			skateparkActual.setEmpresa(skatepark.getEmpresa());
			skateparkActual.setRegion(skatepark.getRegion());
			
			servicio.save(skateparkActual);
			
		}catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar un update a base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		
		 response.put("mensaje", "El skatepark ha sido actualizado con éxito!");
		 response.put("skatepark",skateparkActual);
		 
		 return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}
	
	/*@DeleteMapping("/skatepark/{id}")
	public void deleteSkatepark(@PathVariable Long id) {
		servicio.delete(id);
	}*/
	
	@DeleteMapping("/skatepark/{id}")
	public ResponseEntity<?> deleteSkatepark(@PathVariable Long id) {
		
		Skatepark skateparkActual = servicio.findById(id);
		
		Map<String, Object> response = new HashMap<>();
		
		if(skateparkActual == null) {
			response.put("mensaje","Error: no se pudo eliminar, el skatepark con ID: "+id.toString()+" no existe en la base de datos");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			
			servicio.delete(id);
			
			String nombreFotoAnterior = skateparkActual.getImagen();
			
			if(nombreFotoAnterior != null && nombreFotoAnterior.length() > 0) {
				Path rutaFotoAnterior = Paths.get("uploads").resolve(nombreFotoAnterior).toAbsolutePath();
				File archivoFotoAnterior = rutaFotoAnterior.toFile();
				
				if(archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
					archivoFotoAnterior.delete();
				}
			}
			
		}catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar un delete a base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		
		
		 response.put("mensaje", "El skatepark ha sido eliminado con éxito!");
		 response.put("skatepark",skateparkActual);
		 
		 return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
		
	}
	
	
	@PostMapping("/skatepark/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id){
		
		Map<String,Object> response = new HashMap<>();
		
		Skatepark skatepark = servicio.findById(id);
		
		if(!archivo.isEmpty()) {
			//String nombreArchivo = archivo.getOriginalFilename();
			String nombreArchivo = UUID.randomUUID().toString()+"_"+archivo.getOriginalFilename().replace(" ", "");
			Path rutaArchivo = Paths.get("uploads").resolve(nombreArchivo).toAbsolutePath();
			
		
		
			try {
				Files.copy(archivo.getInputStream(), rutaArchivo);
				
			} catch (IOException e) {
				
				response.put("mensaje", "Error al subir la imagen");
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			String nombreFotoAnterior = skatepark.getImagen();
			
			if(nombreFotoAnterior != null && nombreFotoAnterior.length() > 0) {
				Path rutaFotoAnterior = Paths.get("uploads").resolve(nombreFotoAnterior).toAbsolutePath();
				File archivoFotoAnterior = rutaFotoAnterior.toFile();
				
				if(archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
					archivoFotoAnterior.delete();
				}
			}
			
			
			skatepark.setImagen(nombreArchivo);
			servicio.save(skatepark);
			
			response.put("skatepark",skatepark);
			response.put("mensaje","Has subido correctamente la imagen: "+nombreArchivo);
		
		}
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
	}
	
	@GetMapping("/uploads/images/{nombreImagen:.+}")
	public ResponseEntity<Resource> verImagen(@PathVariable String nombreImagen){
		
		Path rutaImagen = Paths.get("uploads").resolve(nombreImagen).toAbsolutePath();
		
		Resource recurso= null;
		
		try {
			
			recurso = new UrlResource(rutaImagen.toUri());
			
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		if(!recurso.exists() && !recurso.isReadable()) {
			throw new RuntimeException("Error no se puede cargar la imagen "+nombreImagen);
		}
		
		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\" "+recurso.getFilename()+"\"");
		
		return new ResponseEntity<Resource>(recurso,cabecera,HttpStatus.OK);
	}
	
	@GetMapping("/skateparks/regiones")
	public List<Region> listarRegiones(){
		return servicio.findAllRegions();
	}
	
	
}