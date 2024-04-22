-- Database: ItSense_DB
CREATE DATABASE ItSense_DB;

-- Cambiar al contexto de la base de datos recién creada
USE ItSense_DB;

-- Creación de la tabla de usuarios
CREATE TABLE usuarios (
    id INT IDENTITY PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- Creación de la tabla de productos
CREATE TABLE productos (
    id INT IDENTITY PRIMARY KEY,
    tipo_elaboracion VARCHAR(50),
    nombre VARCHAR(100),
    defecto BIT,
    estado BIT,
    fecha_ingreso  DATE,
    fecha_salida DATE
);

-- Poblado inicial tabla usuarios
INSERT INTO usuarios (username, password_hash) VALUES ('admin', '1234');

-- Poblado inicial tabla productos
INSERT INTO productos (tipo_elaboracion, nombre, fecha_ingreso, estado, defecto, fecha_salida)
VALUES
    ('Elaborado a mano y máquina', 'Vestido', '2024-03-24', 1, 1, NULL),
    ('Elaborado a mano', 'Sudadera', '2024-03-24', 1, 1, NULL),
    ('Elaborado a mano', 'Camiseta', '2024-03-24', 0, 1, NULL),
    ('Elaborado a mano y máquina', 'Pantalón', '2024-03-24', 0, 1, NULL), -- Aquí corregido
    ('Elaborado a mano', 'Buso', '2024-03-24', 1, 1, NULL);
