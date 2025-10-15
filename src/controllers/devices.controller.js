const { devices } = require('../data/devicesData');

// Helpers
function getNextId(arr) {
  return arr.length ? Math.max(...arr.map(item => item.id)) + 1 : 1;
}

exports.list = (req, res) => {
  let result = [...devices];

  // Filtrado por query string (ej: ?brand=Samsung or ?ownerName=Juan)
  const { brand, model, ownerName, page, limit } = req.query;
  if (brand) result = result.filter(d => d.brand.toLowerCase().includes(brand.toLowerCase()));
  if (model) result = result.filter(d => d.model.toLowerCase().includes(model.toLowerCase()));
  if (ownerName) result = result.filter(d => d.ownerName.toLowerCase().includes(ownerName.toLowerCase()));

  // Paginación
  const pageNum = parseInt(page) || 1;
  const lim = parseInt(limit) || result.length;
  const start = (pageNum - 1) * lim;
  const paginated = result.slice(start, start + lim);

  res.json({ total: result.length, page: pageNum, limit: lim, data: paginated });
};

exports.getById = (req, res) => {
  const id = Number(req.params.id);
  const device = devices.find(d => d.id === id);
  if (!device) return res.status(404).json({ error: 'Device no encontrado' });
  res.json(device);
};

exports.create = (req, res) => {
  const { brand, model, imei, ownerName } = req.body;
  // Validación simple
  const errors = [];
  if (!brand) errors.push('brand es requerido');
  if (!model) errors.push('model es requerido');
  if (!imei) errors.push('imei es requerido');
  if (!ownerName) errors.push('ownerName es requerido');
  if (errors.length) return res.status(400).json({ errors });

  const newDevice = {
    id: getNextId(devices),
    brand,
    model,
    imei,
    ownerName
  };
  devices.push(newDevice);
  res.status(201).json(newDevice);
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
  const device = devices.find(d => d.id === id);
  if (!device) return res.status(404).json({ error: 'Device no encontrado' });

  const { brand, model, imei, ownerName } = req.body;
  // Validación: al menos un campo requerido
  if (!brand && !model && !imei && !ownerName) {
    return res.status(400).json({ error: 'Al menos un campo (brand, model, imei, ownerName) debe ser enviado' });
  }

  if (brand) device.brand = brand;
  if (model) device.model = model;
  if (imei) device.imei = imei;
  if (ownerName) device.ownerName = ownerName;

  res.json(device);
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const index = devices.findIndex(d => d.id === id);
  if (index === -1) return res.status(404).json({ error: 'Device no encontrado' });
  const deleted = devices.splice(index, 1)[0];
  res.json({ message: 'Eliminado correctamente', deleted });
};
