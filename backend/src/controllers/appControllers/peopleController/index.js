const mongoose = require('mongoose');

const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const read = require('./read');
const remove = require('./remove');
const update = require('./update');
const paginatedList = require('./paginatedList');
const updateMany=require('./updateMany');

function modelController() {
  const Model = mongoose.model('People');
  const methods = createCRUDController('People');

  methods.read = (req, res) => read(Model, req, res);
  methods.update = (req, res) => update(Model, req, res);
  methods.delete = (req, res) => remove(Model, req, res);
  methods.list = (req, res) => paginatedList(Model, req, res);
  methods.updateMany=(req,res)=>updateMany(Model,req,res);

  return methods;
}

module.exports = modelController();
