import sqlite3

# Conectar o crear la base de datos
conn = sqlite3.connect('proyecto.db')
cursor = conn.cursor()

# Crear tabla de usuarios
cursor.execute('''
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_usuario TEXT NOT NULL UNIQUE,
    correo TEXT NOT NULL UNIQUE,
    telefono TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
)
''')

# Crear tabla de granjas
cursor.execute('''
CREATE TABLE IF NOT EXISTS granjas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    nombre TEXT NOT NULL,
    ubicacion TEXT,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
)
''')

# Crear tabla de impresoras
cursor.execute('''
CREATE TABLE IF NOT EXISTS impresoras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    granja_id INTEGER,
    modelo TEXT NOT NULL,
    marca TEXT NOT NULL,
    api_key TEXT NOT NULL,
    identificador TEXT NOT NULL,
    FOREIGN KEY(granja_id) REFERENCES granjas(id) ON DELETE CASCADE
)
''')

# Crear tabla de telemetría de impresoras
cursor.execute('''
CREATE TABLE IF NOT EXISTS telemetria_impresoras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    impresora_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    temperatura_hotend DECIMAL(5, 2),
    temperatura_cama DECIMAL(5, 2),
    otros_parametros TEXT,
    FOREIGN KEY(impresora_id) REFERENCES impresoras(id) ON DELETE CASCADE
)
''')

# Crear tabla de trabajos de impresión
cursor.execute('''
CREATE TABLE IF NOT EXISTS trabajos_impresion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    impresora_id INTEGER,
    nombre_trabajo TEXT NOT NULL,
    material_usado DECIMAL(10, 2),
    costo_estimado DECIMAL(10, 2),
    ganancia_estimada DECIMAL(10, 2),
    tiempo_impresion DECIMAL(10, 2),
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    FOREIGN KEY(impresora_id) REFERENCES impresoras(id) ON DELETE CASCADE
)
''')

# Confirmar los cambios y cerrar la conexión
conn.commit()
conn.close()
