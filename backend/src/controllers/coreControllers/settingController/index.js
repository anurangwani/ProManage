const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const crudController = createCRUDController('Setting');

const listBySettingKey = require('./listBySettingKey');
const readBySettingKey = require('./readBySettingKey');
const updateBySettingKey = require('./updateBySettingKey');
const updateManySetting = require('./updateManySetting');
const listAll = require('./listAll');

const settingMethods = {
  read: crudController.read,
  create: crudController.create,
  update: crudController.update,
  list: crudController.list,
  filter: crudController.filter,
  search: crudController.search,
  listAll: listAll,
  listBySettingKey: listBySettingKey,
  readBySettingKey: readBySettingKey,
  updateBySettingKey: updateBySettingKey,
  updateManySetting: updateManySetting,
};

module.exports = settingMethods;



