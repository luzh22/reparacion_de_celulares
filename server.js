const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importar rutas
const devicesRoutes = require('./src/routes/devices.routes');
const repairServicesRoutes = require('./src/routes/repairServices.routes');
const repairOrdersRoutes = require('./src/routes/repairOrders.routes');

app.use('/api/devices', devicesRoutes);
app.use('/api/repairServices', repairServicesRoutes);
app.use('/api/repairOrders', repairOrdersRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API de Reparación de Celulares funcionando correctamente 🚀');
});

// Manejo de errores y rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`✅ API corriendo en http://localhost:${port}`);
});
