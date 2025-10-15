const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rutas modulares
const devicesRoutes = require('./src/routes/devices.routes');
const repairServicesRoutes = require('./src/routes/repairServices.routes');
const repairOrdersRoutes = require('./src/routes/repairOrders.routes');

app.use('/api/devices', devicesRoutes);
app.use('/api/repairServices', repairServicesRoutes);
app.use('/api/repairOrders', repairOrdersRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
