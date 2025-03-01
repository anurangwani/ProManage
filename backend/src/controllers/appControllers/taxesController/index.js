// const mongoose = require('mongoose');
// const Model = mongoose.model('Taxes');
// const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
// const methods = createCRUDController('Taxes');

// delete methods['delete'];

// methods.create = async (req, res) => {
//   const { isDefault } = req.body;

//   if (isDefault) {
//     await Model.updateMany({}, { isDefault: false });
//   }

//   const countDefault = await Model.countDocuments({
//     isDefault: true,
//   });

//   const result = await new Model({
//     ...req.body,

//     isDefault: countDefault < 1 ? true : false,
//   }).save();

//   return res.status(200).json({
//     success: true,
//     result: result,
//     message: 'Tax created successfully',
//   });
// };

// methods.delete = async (req, res) => {
//   return res.status(403).json({
//     success: false,
//     result: null,
//     message: "you can't delete tax after it has been created",
//   });
// };

// methods.update = async (req, res) => {
//   return res.status(200).json({
//     success: true,
//     result: null,
//     message: 'Please Upgrade to Premium  Version to have full features',
//   });
// };

// module.exports = methods;
const mongoose = require('mongoose');
const Model = mongoose.model('Taxes');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Taxes');

delete methods['delete'];

methods.create = async (req, res) => {
  const { isDefault } = req.body;

  if (isDefault) {
    await Model.updateMany({}, { isDefault: false });
  }

  const countDefault = await Model.countDocuments({
    isDefault: true,
  });

  const result = await new Model({
    ...req.body,
    isDefault: countDefault < 1 ? true : false,
  }).save();

  return res.status(200).json({
    success: true,
    result: result,
    message: 'Tax created successfully',
  });
};

methods.delete = async (req, res) => {
  return res.status(403).json({
    success: false,
    result: null,
    message: "you can't delete tax after it has been created",
  });
};

methods.update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (updateData.isDefault) {
      await Model.updateMany({}, { isDefault: false });
    }

    const result = await Model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Tax not found',
      });
    }

    return res.status(200).json({
      success: true,
      result: result,
      message: 'Tax updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error updating tax',
    });
  }
};

module.exports = methods;
