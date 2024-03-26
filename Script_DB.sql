<<<<<<< HEAD
=======
-- Database: ItSense_DB

>>>>>>> 7ace503b66f6ab75d4440057520adcad154b1d7f
-- DROP DATABASE IF EXISTS "ItSense_DB";

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
<<<<<<< HEAD
    tipo_elaboracion VARCHAR(50),
    nombre VARCHAR(100),
    defecto BOOLEAN,
    estado BOOLEAN,
    fecha_ingreso TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_salida DATE
);

-- Poblado inicial tabla usuarios
INSERT INTO usuarios (username, password_hash) VALUES ('admin', '1234');

-- Poblado inicial tabla productos
INSERT INTO productos (tipo_elaboracion, nombre, defecto, estado, fecha_ingreso, fecha_salida)
VALUES
    ('Elaborado a mano y máquina', 'Vestido', true, true, '2024-03-24 21:51:38.663062-05', NULL),
    ('Elaborado a mano', 'Sudadera', false, true, '2024-03-24 21:51:38.663062-05', NULL),
    ('Elaborado a mano', 'Camiseta', false, false, '2024-03-24 21:51:38.663062-05', NULL),
    ('Elaborado a mano y máquina', 'Pantalón', false, false, '2024-03-24 21:51:38.663062-05', NULL),
    ('Elaborado a mano', 'Buso', true, true, '-infinity', NULL);
=======
    tipo_elaboracion VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL
);

-- Creación de la tabla de registro de autenticación para tokens JWT
CREATE TABLE token_registros (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL,
    fecha_expiracion TIMESTAMP NOT NULL
);

>>>>>>> 7ace503b66f6ab75d4440057520adcad154b1d7f
