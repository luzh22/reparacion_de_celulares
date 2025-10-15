const { repairServices } = require('../data/repairServicesData');

function getNextId(arr) {
  return arr.length ? Math.max(...arr.map(item => item.id)) + 1 : 1;
}

exports.list = (req, res) => {
  let result = [...repairServices];
  const { name, page, limit } = req.query;
  if (name) result = result.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));

  const pageNum = parseInt(page) || 1;
  const lim = parseInt(limit) || result.length;
  const start = (pageNum - 1) * lim;
  const paginated = result.slice(start, start + lim);

  res.json({ total: result.length, page: pageNum, limit: lim, data: paginated });
};

exports.getById = (req, res) => {
  const id = Number(req.params.id);
  const item = repairServices.find(r => r.id === id);
  if (!item) return res.status(404).json({ error: 'RepairService no encontrado' });
  res.json(item);
};

exports.create = (req, res) => {
  const { name, description, estimatedTime, price } = req.body;
  const errors = [];
  if (!name) errors.push('name es requerido');
  if (!description) errors.push('description es requerido');
  if (!estimatedTime) errors.push('estimatedTime es requerido');
  if (price === undefined) errors.push('price es requerido');
  if (errors.length) return res.status(400).json({ errors });

  const newService = {
    id: getNextId(repairServices),
    name,
    description,
    estimatedTime,
    price: Number(price)
  };
  repairServices.push(newService);
  res.status(201).json(newService);
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
  const item = repairServices.find(r => r.id === id);
  if (!item) return res.status(404).json({ error: 'RepairService no encontrado' });

  const { name, description, estimatedTime, price } = req.body;
  if (!name && !description && !estimatedTime && price === undefined) {
    return res.status(400).json({ error: 'Al menos un campo debe ser enviado' });
  }

  if (name) item.name = name;
  if (description) item.description = description;
  if (estimatedTime) item.estimatedTime = estimatedTime;
  if (price !== undefined) item.price = Number(price);

  res.json(item);
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const index = repairServices.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'RepairService no encontrado' });
  const deleted = repairServices.splice(index, 1)[0];
  res.json({ message: 'Eliminado correctamente', deleted });
};
