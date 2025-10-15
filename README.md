# 🛠️ API REST - Reparación de Celulares

Proyecto desarrollado por **Luz Stefanny Herrera Rodríguez**  
Programa: **Análisis y Desarrollo de Software (SENA)**

---

## 📖 Descripción General

Esta API fue desarrollada como práctica para aplicar los conceptos fundamentales de **Express.js**, **ruteo modular**, **validaciones**, y **gestión de datos en memoria**.  
El dominio elegido es la **Reparación de Celulares**, e incluye la gestión de tres entidades principales:

- **Devices (Dispositivos)**
- **Repair Services (Servicios de reparación)**
- **Repair Orders (Órdenes de reparación)**

El proyecto permite realizar operaciones **CRUD completas**, validaciones básicas, filtrado mediante **query strings** y **paginación de resultados**.

---

## ⚙️ Tecnologías Utilizadas

- **Node.js** v22.x  
- **Express.js** v4.x  
- **Nodemon** (para entorno de desarrollo)  

---

## 📁 Estructura del Proyecto

reparacion_de_celulares/
│
├── package.json
├── server.js
├── README.md
└── src/
├── routes/
│ ├── devices.routes.js
│ ├── repairServices.routes.js
│ └── repairOrders.routes.js
│
├── controllers/
│ ├── devices.controller.js
│ ├── repairServices.controller.js
│ └── repairOrders.controller.js
│
└── data/
├── devicesData.js
├── repairServicesData.js
└── repairOrdersData.js

---

## 🚀 Instalación y Ejecución

###  Clonar o descargar el proyecto
```bash
git clone https://github.com/luzh22/reparacion_de_celulares.git
cd reparacion_de_celulares
##INSTALAR DEPENDENCIAS
npm install
##INICIAR EL SERVIDOR 
npm run dev

Endpoints Principales
Método	Endpoint	Descripción
GET	/api/devices	Listar todos los dispositivos
GET	/api/devices/:id	Consultar un dispositivo por ID
POST	/api/devices	Crear un nuevo dispositivo
PUT	/api/devices/:id	Actualizar un dispositivo
DELETE	/api/devices/:id	Eliminar un dispositivo

Repair Services
Método	Endpoint	Descripción
GET	/api/repairServices	Listar servicios de reparación
GET	/api/repairServices/:id	Consultar servicio por ID
POST	/api/repairServices	Crear nuevo servicio
PUT	/api/repairServices/:id	Actualizar servicio
DELETE	/api/repairServices/:id	Eliminar servicio

Repair Orders
Método	Endpoint	Descripción
GET	/api/repairOrders	Listar órdenes de reparación
GET	/api/repairOrders/:id	Consultar orden por ID
POST	/api/repairOrders	Crear nueva orden
PUT	/api/repairOrders/:id	Actualizar orden
DELETE	/api/repairOrders/:id	Eliminar orden

Validaciones Implementadas

Validación de campos requeridos en POST y PUT.

Validación de existencia de deviceId y serviceId en las órdenes.

Manejo de errores con códigos HTTP (400, 404, 500).

Autora

Luz Stefanny Herrera Rodríguez
📧 Correo: luzh2298@gmail.com

📞 Teléfono: 3192392387 / 3202948095
📍 SENA - Etapa Lectiva, Análisis y Desarrollo de Software

