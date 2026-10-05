INSERT INTO charla (titulo, expositor, nivel, email_contacto, fecha_inicio, fecha_fin) VALUES ('Introduccion a la Inteligencia Artificial', 'Dra. Maria Rojas', 'Principiante', 'maria@ai-lab.com', '2026-11-10', '2026-11-10');
INSERT INTO charla (titulo, expositor, nivel, email_contacto, fecha_inicio, fecha_fin) VALUES ('Microservicios con Spring Cloud', 'Ing. Carlos Brenes', 'Avanzado', 'carlos@spring.io', '2026-11-11', '2026-11-12');
INSERT INTO charla (titulo, expositor, nivel, email_contacto, fecha_inicio, fecha_fin) VALUES ('Angular 18: Señales y Standalone', 'Licda. Laura Gomez', 'Intermedio', 'laura@angular.dev', '2026-11-13', '2026-11-14');

INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (1, 'IA');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (1, 'Machine Learning');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (2, 'Spring Boot');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (2, 'Backend');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (2, 'Nube');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (3, 'Angular');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (3, 'Frontend');

INSERT INTO asistente (nombre_completo, correo, edad, charla_id) VALUES ('Sofia Ramirez Mora', 'sofia.ramirez@correo.com', 22, 1);
INSERT INTO asistente (nombre_completo, correo, edad, charla_id) VALUES ('Diego Alvarado Solano', 'diego.alvarado@correo.com', 25, 1);
INSERT INTO asistente (nombre_completo, correo, edad, charla_id) VALUES ('Valeria Chaves Jimenez', 'valeria.chaves@correo.com', 31, 2);
INSERT INTO asistente (nombre_completo, correo, edad, charla_id) VALUES ('Andres Vindas Castro', 'andres.vindas@correo.com', 28, 2);
INSERT INTO asistente (nombre_completo, correo, edad, charla_id) VALUES ('Karla Mendez Araya', 'karla.mendez@correo.com', 19, 2);
INSERT INTO asistente (nombre_completo, correo, edad, charla_id) VALUES ('Jose Pablo Quesada', 'jose.quesada@correo.com', 34, 3);
INSERT INTO asistente (nombre_completo, correo, edad, charla_id) VALUES ('Daniela Rojas Fallas', 'daniela.rojas@correo.com', 21, 3);
