-- Database: ItSense_DB
CREATE DATABASE "ItSense_DB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Colombia.1252'
    LC_CTYPE = 'Spanish_Colombia.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Creación de la tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- Creación de la tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    tipo_elaboracion VARCHAR(50),
    nombre VARCHAR(100),
    defecto BOOLEAN,
    estado BOOLEAN,
    fecha_ingreso  DATE,
    fecha_salida DATE
);

-- Poblado inicial tabla usuarios
INSERT INTO usuarios (username, password_hash) VALUES ('admin', '1234');

-- Poblado inicial tabla productos
INSERT INTO productos (tipo_elaboracion, nombre, fecha_ingreso, estado, defecto, fecha_salida)
VALUES
    ('Elaborado a mano y máquina', 'Vestido', '2024-03-24', true, true, NULL),
    ('Elaborado a mano', 'Sudadera', '2024-03-24', true, true, NULL),
    ('Elaborado a mano', 'Camiseta', '2024-03-24', true, false, NULL),
    ('Elaborado a mano y máquina', 'Pantalón', '2024-03-24', true, false, NULL), -- Aquí corregido
    ('Elaborado a mano', 'Buso', '2024-03-24', true, true, NULL);

