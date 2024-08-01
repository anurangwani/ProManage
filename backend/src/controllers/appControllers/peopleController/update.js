

const mongoose = require('mongoose');
const Client = mongoose.model('Client');
const Lead = mongoose.model('People');

const update = async (Model, req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  if (!id || !updateData) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Both id and updateData are required.',
    });
  }

  try {
    const updatedDocument = await Model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('company', 'name').exec();

    if (!updatedDocument) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Document not found.',
      });
    }

    return res.status(200).json({
      success: true,
      result: updatedDocument,
      message: 'Document updated successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error updating document: ' + error.message,
    });
  }
};

module.exports = update;
