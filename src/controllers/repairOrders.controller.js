const { repairOrders } = require('../data/repairOrdersData');
const { devices } = require('../data/devicesData');
const { repairServices } = require('../data/repairServicesData');

function getNextId(arr) {
  return arr.length ? Math.max(...arr.map(item => item.id)) + 1 : 1;
}

exports.list = (req, res) => {
  let result = [...repairOrders];
  const { deviceId, serviceId, status, page, limit } = req.query;
  if (deviceId) result = result.filter(o => o.deviceId === Number(deviceId));
  if (serviceId) result = result.filter(o => o.serviceId === Number(serviceId));
  if (status) result = result.filter(o => o.status.toLowerCase().includes(status.toLowerCase()));

  const pageNum = parseInt(page) || 1;
  const lim = parseInt(limit) || result.length;
  const start = (pageNum - 1) * lim;
  const paginated = result.slice(start, start + lim);

  res.json({ total: result.length, page: pageNum, limit: lim, data: paginated });
};

exports.getById = (req, res) => {
  const id = Number(req.params.id);
  const item = repairOrders.find(r => r.id === id);
  if (!item) return res.status(404).json({ error: 'RepairOrder no encontrado' });
  res.json(item);
};

exports.create = (req, res) => {
  const { deviceId, serviceId, date, status } = req.body;
  const errors = [];
  if (deviceId === undefined) errors.push('deviceId es requerido');
  if (serviceId === undefined) errors.push('serviceId es requerido');
  if (!date) errors.push('date es requerido');
  if (!status) errors.push('status es requerido');
  // Validar existencia de device y service
  if (deviceId !== undefined && !devices.find(d => d.id === Number(deviceId))) {
    errors.push('deviceId no existe');
  }
  if (serviceId !== undefined && !repairServices.find(s => s.id === Number(serviceId))) {
    errors.push('serviceId no existe');
  }
  if (errors.length) return res.status(400).json({ errors });

  const newOrder = {
    id: getNextId(repairOrders),
    deviceId: Number(deviceId),
    serviceId: Number(serviceId),
    date,
    status
  };
  repairOrders.push(newOrder);
  res.status(201).json(newOrder);
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
  const item = repairOrders.find(r => r.id === id);
  if (!item) return res.status(404).json({ error: 'RepairOrder no encontrado' });

  const { deviceId, serviceId, date, status } = req.body;
  // Si cambian deviceId/serviceId, validar existencia
  const errors = [];
  if (deviceId !== undefined && !devices.find(d => d.id === Number(deviceId))) {
    errors.push('deviceId no existe');
  }
  if (serviceId !== undefined && !repairServices.find(s => s.id === Number(serviceId))) {
    errors.push('serviceId no existe');
  }
  if (errors.length) return res.status(400).json({ errors });

  if (deviceId !== undefined) item.deviceId = Number(deviceId);
  if (serviceId !== undefined) item.serviceId = Number(serviceId);
  if (date) item.date = date;
  if (status) item.status = status;

  res.json(item);
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const index = repairOrders.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'RepairOrder no encontrado' });
  const deleted = repairOrders.splice(index, 1)[0];
  res.json({ message: 'Eliminado correctamente', deleted });
};
