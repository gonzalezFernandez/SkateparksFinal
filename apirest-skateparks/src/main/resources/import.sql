INSERT INTO regiones(nombre,imagen) VALUES ('Asturias','507a429b-6c0e-4147-b074-76b80c8e0b95_que-hacer-en-asturias-el-puente-de-diciembre.jpg');
INSERT INTO regiones(nombre,imagen) VALUES ('Cantabria','');
INSERT INTO regiones(nombre,imagen) VALUES ('Pais Vasco','');
INSERT INTO regiones(nombre,imagen) VALUES ('Barcelona','');
INSERT INTO regiones(nombre,imagen) VALUES ('Galicia','');
INSERT INTO regiones(nombre,imagen) VALUES ('Madrid','');




INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (1,'La Magdalena','Skatepark','4','Intermedio','Ayuntamiento Avilés','2015-04-01','2424b782-c85d-44c9-929c-d4c53d32e7bc_skatepark-aviles1.jpg');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (4,'MACBA','Street Spot','5','Intermedio','Museo de Arte contemporaneo de Barcelona','2000-06-01','0e051731-1eba-4e64-a1ed-5dcf342b07d5_315-macba-skate-barcelona-spain.jpg');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (2,'La Lechera','Skatepark','4','Intermedio','Ayto. Torrelavega','2017-04-01','');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (4,'Skate Ágora','Skatepark','5','Dificil','Street League','2016-03-15','2cea5392-9bb4-4338-85a4-46e80edf9bb4_DJI_0032.jpg');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (1,'Salinas','Skatepark','3','Facil','ZUT Skateparks','2021-07-01','0cc73f68-f791-47e9-ae12-f73dc4824f52_salinas.jpg');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (3,'La Kantera','Skatepark','3','Dificil','ZUT Skateparks','2012-03-01','6c6bbdbf-b4fa-4516-abfc-1e4530e4e179_La-Kantera-skate-eskola-Reforma-skatepark-2016-Getxo.jpg');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (6,'Congresos','Street Spot','4','Intermedio','Comunidad de Madrid','2006-04-01','35b967cc-ea44-4c3d-aa75-10829143b84e_congres.jpg');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (6,'Tetuán','Skate Plaza','5','Intermedio','Comunidad de Madrid','2018-07-01','30be61e0-74b8-46b4-a2e9-601f2fe9b5ab_tetuanskateplaza-970x970.jpg');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (6,'Madrid Rio','Skatepark','4','Intermedio','ZUT Skateparks','2017-10-01','2c759776-5871-4b33-b5a6-04b44191bfbf_MadridRio.jpg');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (5,'Lugo','Skatepark','3','Facil','ZUT Skateparks','2022-03-01','');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (1,'Plaza de España','Street Spot','5','Dificil','Ayuntamiento Oviedo','2000-03-01','');
INSERT INTO skateparks (region_id,nombre,tipo,puntuacion,dificultad,empresa,created_at,imagen) VALUES (6,'ESKOMBRO','Skate Plaza','5','Dificil','DIY','2018-06-01','ff9ad1c8-bcb3-4b76-a58f-df93790bf4db_Skatepark-Escombro-Madrid-antiguo.jpg');



INSERT INTO usuarios (username, password, enabled) VALUES('admin', '$2a$10$rqaesrW8UPpQdpyoK1ZQKeBA9pU0YNLMSLVWc1mt/HlhN5zRVBH6G', 1);
INSERT INTO usuarios (username, password, enabled) VALUES('andres', '$2a$10$Rt5zxYqgm82LZOVkHUNxE.mnHUr4v1pKI1FBKAzFU.zlz/WCDDXxy', 1);

INSERT INTO roles (nombre) VALUES ('ROLE_USER');
INSERT INTO roles (nombre) VALUES ('ROLE_ADMIN');

INSERT INTO usuarios_roles (usuario_id,role_id) VALUES (1,1);
INSERT INTO usuarios_roles (usuario_id,role_id) VALUES (2,2);
INSERT INTO usuarios_roles (usuario_id,role_id) VALUES (2,1);

